### Bulk Role Change Errors

You may get the following errors for bulk role change:

| Message                                | Meaning                                                  |
|----------------------------------------|----------------------------------------------------------|
| invalid role in list                   | A role in the list of roles to change does not exist in this room.           |
| target role clash with requested roles | the 'toRole' is also listed as one to change to 'toRole' |
| role does not have required permission | Peer does not have role change permission.               |
| peer left                              | The peer who's role was to be changed has left.          |
| role invalid                           | The 'toRole' is invalid.                                 |