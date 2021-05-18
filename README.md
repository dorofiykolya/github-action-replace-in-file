# github-action-replace-in-file

## Usage

### Inputs

| Input                  | Description                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `file`                 | path to file                                                                             |
| `search`  _(optional)_ | search string                                                                            |
| `replace` _(optional)_ | replace string                                                                           |
| `list`    _(optional)_ | list of object{search, replace}                                                          |

```yaml
list: |
  - search: "$DOMAIN"
    replace: "testdomain"
  - search: "testvalue"
    replace: "somevalue"
```

### Outputs

| Output          | Description                                 |
| --------------- | ------------------------------------------- |
| `status`        | 'ok' or 'fail'                              |


## Examples
```yaml
- name: Domain,Version,Branch,SHA
  uses: leodoc-app/github-action-replace-in-file@master
  with:
    file: ./swagger/index.yaml
    list: |
      - search: "$DOMAIN"
        replace: "www.test-domain.com"
      - search: "$VERSION"
        replace: "1.0.0"
      - search: "$BRANCH"
        replace: "${{ github.ref }}"
      - search: "$SHA"
        replace: "${{ github.sha }}"
```