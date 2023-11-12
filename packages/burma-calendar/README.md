# Myanmar Calendar

Convert Gregorian date to the Myanmar date including current Myanmar date,moon phase and so on.

# Features

- [x] Myanmar date
- [x] Moon phase
- [x] i18n Support

# Installation

```bash
npm install burma-calendar
```

# Usage

```ts
import { englishToMyanmarDate } from "burma-calendar";

const today = new Date();
const burmaToday = englishToMyanmarDate(today);
console.log(burmaToday);
```

# i18n

```ts
import { i18n } from "burma-calendar";

const inMyanmar = i18n("လပြည့်", "myanmar", "english"); // Full Moon
```
