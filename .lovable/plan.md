
# Fix: Show "Preço Personalizado" Immediately

## Problem
In `src/components/TariffSelector.tsx`, line 45:
```ts
const [showCustomInput, setShowCustomInput] = useState(false);
```
The custom price input is hidden by default and only revealed after the user clicks a tariff option for the first time.

## Fix
Change the initial value of `showCustomInput` from `false` to `true`:

```ts
const [showCustomInput, setShowCustomInput] = useState(true);
```

This single-line change makes the "Preço Personalizado" input visible immediately when the page loads, showing the default price for "Tarifa Normal" (€0.22/kWh) right away — no click required.

## Files to Change
| File | Change |
|------|--------|
| `src/components/TariffSelector.tsx` | Line 45: `useState(false)` → `useState(true)` |
