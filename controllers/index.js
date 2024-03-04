// khởi tạo giao diện, lấy data từ api (navpill.json) async - await khắc phục bất đồng bộ khi chạy hàm
async function onloadData() {
    try {
        let response = await axios({
            url: './../data/Data.json',
            method: 'GET',
        });
        console.log(response);
        showListBtn(response.data.navPills);
    } catch (error) {
        console.log(error);
    }
}

// sau khi lấy được data (response) từ api, hiển thị button lên giao diện. addEventListener thêm sự kiện click
function showListBtn(response) {
    for (let tab of response) {
        let createTab = document.createElement('button');
        createTab.className = 'btn btn-outline-info';
        createTab.addEventListener('click', async (e) => {
            let reset = document.querySelector('.tab-content');
            console.log('reset', reset, reset.hasChildNodes());
            if (reset.hasChildNodes()) {
                reset.innerHTML = '';
            }
            await getData(tab);
        });
        createTab.innerHTML = tab.showName;
        document.querySelector('.nav').appendChild(createTab);
    }
}

// lấy data từ api (tabpanes.json) trả về cho tab để hiển thị khi click button
async function getData(tab) {
    try {
        let response = await axios({
            // url: './../data/tabpanes.json',
            url: './../data/Data.json',
            method: 'GET',
        });
        // console.log(response);
        showListProduct(response.data.tabPanes, tab);
    } catch (error) {
        console.log(error);
    }
}

// từ listProduct lọc data theo type , trả về kết quả lọc (tab: lấy từ api navpill và item lấy từ api tabpanes)
function showListProduct(response, tab) {
    // let product = response.filter(item => {
    //     return item.type === tab.type
    // });
    let product = response.filter((item) => item.type === tab.type);
    console.log(product);
    showItem(product);
}

function showItem(product) {
    for (const item of product) {
        const { imgSrc_jpg: img, name, imgSrc_png: imgBtn } = item;

        const createItem = document.createElement('div');
        createItem.className = 'card w-25';

        const createImgItem = document.createElement('img');
        createImgItem.className = 'card-img-top';
        createImgItem.src = img;

        const createNameItem = document.createElement('h5');
        createNameItem.className = 'card-title mt-2 text-center';
        createNameItem.textContent = name;

        const createBtn = document.createElement('button');
        createBtn.className = 'btn btn-outline-secondary';
        createBtn.textContent = 'Thử đồ';
        createBtn.addEventListener('click', async (e) => {
            await tryOnProduct(item, imgBtn);
        });

        const tabContent = document.querySelector('.tab-content');
        tabContent.appendChild(createItem);
        createItem.appendChild(createImgItem);
        createItem.appendChild(createNameItem);
        createItem.appendChild(createBtn);
    }
}

// khi ấn nút thử đồ, sẽ duyệt type từ api sau đó dom đến thẻ cần thay đổi.
function tryOnProduct(item, imgBtn) {
    let domDiv = '';
    if (item.type === 'topclothes') {
        domDiv = '.bikinitop';
    } else if (item.type === 'botclothes') {
        domDiv = '.bikinibottom';
    } else if (item.type === 'shoes') {
        domDiv = '.feet';
    } else if (item.type === 'handbags') {
        domDiv = '.handbag';
    } else if (item.type === 'necklaces') {
        domDiv = '.necklace';
    } else if (item.type === 'hairstyle') {
        domDiv = '.hairstyle';
    } else if (item.type === 'background') {
        domDiv = '.background';
    }
    let dom = document.querySelector(domDiv);
    dom.style.background = 'url(' + imgBtn + ')no-repeat';
    dom.style.backgroundSize = 'cover';
    // console.log(dom, imgBtn);
}
