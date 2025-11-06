// SPDX-License-Identifier: Proprietary
fetch("../.IMMORTAL_PAYLOAD").then(r => r.text()).then(data => { const entries = data.trim().split("\n").reverse(); document.getElementById("payload").innerHTML = entries.map(line => `<p>${line}</p>`).join(""); });
