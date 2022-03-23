import axios from "axios";
import { v4 as uuid } from "uuid";

export class RealtimeDatabaseReferance {
    url = 'http://localhost:8000/api/realtime/';
    constructor(ref, url) {
        this.ref = ref;
        if (url) {
            this.url = url;
        }
    }
    sse = {}
    session_id = null;
    listen(callback) {
        this.session_id = uuid();
        const sse = new EventSource([this.url + 'listen?id=' + this.session_id], { withCredentials: true });
        this.sse = sse;
        this.sse.onmessage = (event) => {
            const data = JSON.parse(event.data);
            let r1 = this.ref
            if (r1 == '*') {
                callback(null, data);
            } else if (r1.indexOf('.') > -1) {
                let data2 = r1.split('.').reduce((o, i) => o[i], data);
                callback(null, data2);
            }
            else if (data[r1]) {
                callback(null, data[r1]);
            }

        }
        this.sse.onerror = (error) => {
            this.sse.close();
            callback(error, null);
        }
        this.sse.addEventListener('open', (event) => {
        });
        this.sse.addEventListener('close', (event) => {
        });
    }



    close() {
        axios.post(this.url + 'stop', { id: this.session_id })
        this.sse.close();
    }


    push(data) {
        return axios.post(this.url + 'put', { ref: this.ref, data: data });
    }

}
export class RealtimeDatabaseClient {
    referances = [];
    url = 'http://localhost:8000/api/realtime/';
    constructor(url) {
        if (url) {
            this.url = url;
        }
    }

    ref(ref) {
        if (this.referances.find(r => r.ref == ref)) {
            return this.referances.find(r => r.ref == ref);
        }
        const r = new RealtimeDatabaseReferance(ref, this.url);
        this.referances.push(r);
        return r;
    }
    close() {
        this.referances.forEach(ref => {
            ref.close();
        })
    }
}
