# Client side (Beta version) of CalcMeUp project

Location
http://http://cmu.ilya-r.com/

Layouts:
```
https://www.figma.com/file/3DWbCoW6H7RjfeRt5J0HJf/FinCloud?node-id=0%3A1
```

API code base:
```
https://github.com/Turngait/fincloud_api_nest
```

## Requirements

Packages:
```
git
nodejs
npm
```
## Project setup (Linux version)

```
git clone https://github.com/Turngait/cmu_client.git client
cd client
npm install
cd src/config
cp key.example.js key.js
```
Add API_KEY in key.js file

### Run in dev mode
```
npm run serve
```

### Building
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
