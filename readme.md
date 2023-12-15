To run from FitNesse:

```
!include -c .FrontPage.MaintenancE.ScenarioLibrary

!| script | external process | bash -c "cd isw && HOST=http://192.168.1.1 CI=true STARTED_AT=${STARTED_AT} /root/.nvm/versions/node/v20.9.0/bin/npx playwright test ${RUNNING_PAGE_NAME}.spec.ts --project=chromium" |
| set timeout | 200 | seconds |
|check|exit value | 0 |

http://files/testResults/playwright/${STARTED_AT}/index.html
```
