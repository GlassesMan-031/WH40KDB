# api routes /api

## Account /account

### Get account

route: "/account" \
method: GET \
body: {username_or_email: string, password: string}

### Create account

route: "/account" \
method: POST \
body: {username: string, email: string, password: string}

### Delete account

route: "/account" \
method: DELETE \
body: {username_or_email: string, password: string}

### Edit account

route: "/account" \
method: PATCH \
body: {username?: string, email?: string, password?: string}

## Army /army

### create army

route: "/army" \
method: POST \
body: {owner_id: id, name: string, max_points: number}

### edit army

route: "/army/:id" \
method: POST \
body: {name?: string, max_points?: number}

### delete army

route: "/army/:id" \
method: DELETE \
body: no body

### get army

route: "/army/:id" \
method: GET \
body: no body

## Units /unit

### create unit

route: "/" \
method: POST \
body: {army_id: number, name: string, xml_id: string}

### edit unit

route: "/:id" \
method: PATCH \
body: {name?: string, xml_id?: string}

### delete unit

route: "/:id" \
method: DELETE \
body: no body

### get specific unit

route: "/:id" \
method: GET \
body: no body

### get all units in army

route: "/" \
method: GET \
body: no body

## Unit Info /unit/:id/selection

```typescript
interface selectionGroup:
{
  type: "group"
  name: string
  xml_id: string
  is_root: bool
  data: <selectionGroup | selectionEntry>[]
}

interface selectionEntry:
{
  type: "entry"
  name: string
  xml_id: string
  checked: bool
}
```

### create selection for unit

route: "/" \
method: POST \
body: {data: selectionGroup} "a json object"

### edit selection

route: "/:id" \
method: PUT \
body: {data: selectionGroup} "a json object"
