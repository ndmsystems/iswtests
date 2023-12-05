To run from FitNesse:

```
!| script | external process | bash -c "cd isw && HOST=http://192.168.1.1 CI=true /root/.nvm/versions/node/v20.9.0/bin/npx playwright test ${RUNNING_PAGE_NAME}.spec.ts" |
| set timeout | 120 | seconds |
|wait for |
```
