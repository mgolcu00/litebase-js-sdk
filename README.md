# LiteBase JS SDK

### installation
    npm install

# RealtimeDataBase
Realtime data comminication on client and server

### React (WEB, MOBIL)

```JavaScript
const client = new  RealtimeDatabaseClient("<server-url>")
    useEffect(() => {

        //listenting on root item
        client.ref('age').listen((err, data) => {
            if (err) {
                console.log('[ERROR] : ', err)

            }
            else {
                console.log(data);
                setAge(data)
            }
        })
        // listening on in obj 
        client.ref('Example.obj1').listen((err,data) => {
            if (err) {
                console.log('[ERROR] : ', err)
            }
            else {
                setUsername(data)
            }
        })

        // listening list
        client.ref('users').listen((err, data) => {
            if (err) {
                console.log('[ERROR] : ', err)
            }
            else {
                console.log(data);
                setUsers(data)
            }
        })



        return () => {
            client.close()
        }
    }, [])

    const pushUsername = () => {
        // push data
        client.ref('username').push(username)
    }
    const pushAge = () => {
        client.ref('age').push(age)
    }
```



# Push Notification
