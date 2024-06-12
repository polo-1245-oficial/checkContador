import fetch from "node-fetch";
import { parse } from 'node-html-parser';

const webhook = ""
const url = ""
let lastVisits = 0;

async function visitas() {
    try {
        const response = await fetch();
        const html = await response.text();

        const root = parse(html);
        const element = root.querySelector('#countermatomo');
        const visits = parseInt(element.innerText.trim().replace('Visites:', '').trim());

  
        if (visits > lastVisits) {
            await webhook(visits, lastVisits);
        }
        lastVisits = visits;
    } catch (error) {
        console.error(error);
    }
}

async function webhook(visitas, old) {
    try {
        const response = await fetch(url, {
            method: 'post',
            body: JSON.stringify({content: "@everyone Cambió de "+ visitas + " a "+ old }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
    } catch (error) {
        
    }
}

setInterval(visitas(), 86400000); 
