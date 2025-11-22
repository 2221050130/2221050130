let map = L.map('map').setView([21.013812, 105.788045], 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 21,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const treeList = document.getElementById('tree-list');
const fileInput = document.getElementById('file-input');

let features = [];
let geojsonLayer;
let addMode = false;

function getColor(status) {
  switch (status) {
    case 'Tốt': return 'green';
    case 'Cần chăm sóc': return 'yellow';
    case 'Thay thế': return 'red';
    default: return 'gray';
  }
}

function styleMarker(feature) {
  return {
    radius: 8,
    fillColor: getColor(feature.properties.trang_thai),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
}

function renderList() {
  treeList.innerHTML = '';
  features.forEach((f, idx) => {
    const li = document.createElement('li');
    li.textContent = `${f.properties.ten_cay} (${f.properties.trang_thai})`;
    li.className = 'tree-item';
    li.addEventListener('click', () => {
      map.flyTo([f.geometry.coordinates[1], f.geometry.coordinates[0]], 20);
      geojsonLayer.eachLayer(layer => {
        if (layer.feature === f) layer.openPopup();
      });
    });
    treeList.appendChild(li);
  });
}

function createPopupContent(props) {
  return `
  <div class="popup-update">
    <label>Tên cây:</label>
    <input id="edit-name" value="${props.ten_cay}">
    <label>Trạng thái:</label>
    <select id="edit-status">
      <option value="Tốt" ${props.trang_thai === 'Tốt' ? 'selected' : ''}>Tốt</option>
      <option value="Cần chăm sóc" ${props.trang_thai === 'Cần chăm sóc' ? 'selected' : ''}>Cần chăm sóc</option>
      <option value="Thay thế" ${props.trang_thai === 'Thay thế' ? 'selected' : ''}>Thay thế</option>
    </select>
    <label>Ghi chú:</label>
    <textarea id="edit-note">${props.ghi_chu || ''}</textarea>
    <button id="btn-save" class="btn-save">💾 Lưu</button>
    <button id="btn-delete" class="btn-delete">🗑️ Xóa</button>
  </div>`;
}

function addTreeToMap(feature) {
  if (feature) features.push(feature);
  if (geojsonLayer) map.removeLayer(geojsonLayer);
  geojsonLayer = L.geoJSON(features, {
    pointToLayer: (f, latlng) => L.circleMarker(latlng, styleMarker(f)),
    onEachFeature: (f, layer) => {
      layer.bindPopup(createPopupContent(f.properties));
      layer.on('popupopen', () => {
        document.getElementById('btn-save').onclick = () => {
          f.properties.ten_cay = document.getElementById('edit-name').value;
          f.properties.trang_thai = document.getElementById('edit-status').value;
          f.properties.ghi_chu = document.getElementById('edit-note').value;
          layer.setStyle(styleMarker(f));
          renderList();
          alert("Đã lưu thay đổi!");
        };
        document.getElementById('btn-delete').onclick = () => {
          features = features.filter(x => x !== f);
          map.removeLayer(layer);
          renderList();
          alert("Đã xóa cây!");
        };
      });
    }
  }).addTo(map);
  renderList();
}

fetch('cayxanh.geojson')
  .then(res => res.json())
  .then(data => {
    features = data.features;
    addTreeToMap(null);
  });

document.getElementById('btn-add').onclick = () => {
  addMode = true;
  alert("Chế độ thêm cây: hãy click lên bản đồ để chọn vị trí!");
};

map.on('click', e => {
  if (!addMode) return;
  addMode = false;
  const ten = prompt("Nhập tên cây:");
  if (!ten) return;
  const newFeature = {
    type: "Feature",
    geometry: { type: "Point", coordinates: [e.latlng.lng, e.latlng.lat] },
    properties: { ten_cay: ten, trang_thai: "Tốt", ghi_chu: "" }
  };
  addTreeToMap(newFeature);
});

document.getElementById('btn-export').onclick = () => {
  const headers = ["ten_cay","trang_thai","ghi_chu","lat","lng"];
  const rows = features.map(f => [
    f.properties.ten_cay,
    f.properties.trang_thai,
    f.properties.ghi_chu,
    f.geometry.coordinates[1],
    f.geometry.coordinates[0]
  ]);
  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'cayxanh.csv';
  link.click();
};

document.getElementById('btn-import').onclick = () => fileInput.click();
fileInput.onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const lines = ev.target.result.split("\n").slice(1);
    lines.forEach(line => {
      const [ten,trangthai,ghichu,lat,lng] = line.split(",");
      if (!ten) return;
      const f = {
        type: "Feature",
        geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
        properties: { ten_cay: ten, trang_thai: trangthai, ghi_chu: ghichu }
      };
      features.push(f);
    });
    addTreeToMap(null);
    alert("Đã nhập dữ liệu CSV!");
  };
  reader.readAsText(file);
};