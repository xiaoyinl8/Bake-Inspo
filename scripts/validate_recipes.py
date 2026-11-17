#!/usr/bin/env python3
"""Checks every recipe file before the site is built. Run it from the project root:  python3 scripts/validate_recipes.py

ERRORS stop the deploy (they would break the live site): bad JSON, missing fields, grams that aren't numbers, duplicate ids.
WARNINGS are just reminders and never stop it: unused menu ids, missing storage lines, odd times or temperatures.
"""
import glob
import json
import re
import sys

errors, warnings = [], []
err = errors.append
warn = warnings.append

recipes = {}
for path in sorted(glob.glob("src/data/*.json")):
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        err(f"{path}: not valid JSON ({e}). Look for a missing comma, quote or bracket near line {e.lineno}.")
        continue
    if not isinstance(data, list):
        err(f"{path}: the file must contain a list [ ... ] of recipes.")
        continue
    for n, r in enumerate(data, 1):
        where = f"{path} recipe #{n}" + (f" ({r.get('id')})" if isinstance(r, dict) and r.get("id") else "")
        if not isinstance(r, dict):
            err(f"{where}: each recipe must be an object {{ ... }}.")
            continue
        for key in ("id", "name", "emoji", "tags", "totalTime", "yield", "ingredients", "steps"):
            if key not in r:
                err(f"{where}: missing \"{key}\".")
        rid = r.get("id")
        if isinstance(rid, str):
            if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", rid):
                err(f"{where}: id \"{rid}\" should be lowercase words joined by hyphens, like \"lemon-tart\".")
            if rid in recipes:
                err(f"{where}: id \"{rid}\" is already used in {recipes[rid]['_file']}.")
            r["_file"] = path
            recipes[rid] = r
        for key in ("name", "emoji", "totalTime", "yield"):
            if key in r and not (isinstance(r[key], str) and r[key].strip()):
                err(f"{where}: \"{key}\" must be non-empty text.")
        if "totalTime" in r and isinstance(r["totalTime"], str) and not re.search(r"\d+\s*(min|hour)", r["totalTime"]):
            warn(f"{where}: totalTime \"{r['totalTime']}\" has no number of minutes or hours, so filters and mood tiles can't read it.")
        tags = r.get("tags")
        if tags is not None and not (isinstance(tags, list) and tags and all(isinstance(t, str) for t in tags)):
            err(f"{where}: \"tags\" must be a non-empty list of text.")
        ings = r.get("ingredients")
        if isinstance(ings, list):
            if not ings:
                err(f"{where}: no ingredients.")
            for i in ings:
                if not (isinstance(i, dict) and isinstance(i.get("name"), str) and i["name"].strip()):
                    err(f"{where}: an ingredient is missing its \"name\": {i}")
                    continue
                g = i.get("grams")
                if isinstance(g, bool) or not isinstance(g, (int, float)) or g <= 0:
                    err(f"{where}: \"{i['name']}\" needs \"grams\" as a number above 0 (got {g!r}).")
                elif g > 5000:
                    warn(f"{where}: \"{i['name']}\" is {g} g. Is that a typo?")
        elif "ingredients" in r:
            err(f"{where}: \"ingredients\" must be a list.")
        steps = r.get("steps")
        if isinstance(steps, list):
            if not steps:
                err(f"{where}: no steps.")
            for k, s in enumerate(steps, 1):
                if not isinstance(s, dict) or not str(s.get("title", "")).strip() or not str(s.get("text", "")).strip():
                    err(f"{where}: step {k} needs both \"title\" and \"text\".")
                    continue
                t = s.get("time")
                if t is not None and (not isinstance(t, str) or not re.search(r"\d", t)):
                    warn(f"{where}: step {k} time \"{t}\" has no number, so the cook-mode timer can't start from it.")
                tp = s.get("temp")
                if tp is not None:
                    # Any text is fine as long as every temperature is written in °C, like "180 °C" or "220 °C, then 190 °C"
                    nums = [int(n) for n in re.findall(r"\d+", tp)] if isinstance(tp, str) else []
                    if not isinstance(tp, str) or "°C" not in tp or "°F" in tp or not nums:
                        warn(f"{where}: step {k} temp \"{tp}\" should be written in °C, like \"180 °C\", so it converts to °F.")
                    elif max(nums) > 300:
                        warn(f"{where}: step {k} temp \"{tp}\" is very hot. Is that a typo?")
        elif "steps" in r:
            err(f"{where}: \"steps\" must be a list.")

# ---- menu (src/categories.js) ----
try:
    cat = open("src/categories.js", encoding="utf-8").read()
    listed = []
    for block in re.findall(r"ids:\s*\[(.*?)\]", cat, re.S):
        listed += re.findall(r'"([^"]+)"', block)
    seen = set()
    for rid in listed:
        if rid not in recipes:
            warn(f'src/categories.js lists "{rid}" but no recipe has that id. It is skipped on the site (a typo, or a recipe you haven\'t added yet).')
        if rid in seen:
            warn(f'src/categories.js lists "{rid}" more than once. Only its first spot is used.')
        seen.add(rid)
    for rid in recipes:
        if rid not in seen:
            warn(f'"{rid}" is not in any menu group, so it will show under "More bakes".')
except FileNotFoundError:
    warn("src/categories.js not found, skipping menu checks.")

# ---- extra info (src/info.js) ----
try:
    info = open("src/info.js", encoding="utf-8").read()
    body = info.split("export const INFO", 1)[1].split("\n};", 1)[0]
    info_ids = re.findall(r'^\s*"([a-z0-9-]+)":\s*\{', body, re.M)
    for rid in info_ids:
        if rid not in recipes:
            warn(f'src/info.js has an entry for "{rid}" but no recipe has that id. It is ignored.')
    for rid in recipes:
        if rid not in info_ids:
            warn(f'"{rid}" has no storage line in src/info.js.')
except (FileNotFoundError, IndexError):
    warn("Couldn't read src/info.js, skipping storage checks.")

print(f"Checked {len(recipes)} recipes.")
for w in warnings:
    print("  warning:", w)
for e in errors:
    print("  ERROR:", e)
if errors:
    print(f"\n{len(errors)} error(s). Fix them and push again. The site was not deployed.")
    sys.exit(1)
print(f"OK ({len(warnings)} warning(s)).")
