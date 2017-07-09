## Documentation

You can see below the API reference of this module.

### `machineIp(cb)`
Fetches the ip and creates the following files:

   - `README.md`: The human readable information.
   - `ip.json`: The machine readable information.
   - `ip.txt`: The public ip written in a file.

If any of these is changed, the git repository is updated.

#### Params
- **Function** `cb`: The callback function.

