$(function(){

    const model = {
        cats: [
            {
                id: 'cat1',
                name: 'Tom',
                src: 'images/cat1.jpg',
                clicks: 0
            },
            {
                id: 'cat2',
                name: 'Ralph',
                src: 'images/cat2.jpg',
                clicks: 0
            },
            {
                id: 'cat3',
                name: 'Maximus',
                src: 'images/cat3.jpg',
                clicks: 0
            },
            {
                id: 'cat4',
                name: 'Garfield',
                src: 'images/cat4.jpg',
                clicks: 0
            },
            {
                id: 'cat5',
                name: 'Itchy',
                src: 'images/cat5.jpg',
                clicks: 0
            }
        ],
        currentCat: null,
        admin: false
    };



    const octopus = {
        getCats: () => {
            return model.cats;
        },
        getCurrentCat: () => {
            return model.currentCat;
        },
        init: () => {
            model.currentCat = model.cats[0];
            listView.init();
            catView.render();
            adminView.init();
        },
        addListEvents: () => {
            const cats = octopus.getCats();
            for (let i = 0; i < cats.length; i++) {
                $(`#${cats[i].id}`).on('click', (catCopy => {
                    return () => {
                        model.currentCat = catCopy;
                        catView.render();
                    };
                })(cats[i]));
            }
        },
        addCatEvents: () => {
            const cat = octopus.getCurrentCat();
            $('#cat-img').on('click', () => {
                cat.clicks++;
                catView.render();
            });
        },
        showAdmin: () => {
            $('#admin-form').show();
            $('#admin-name').val(model.currentCat.name);
            $('#admin-imgUrl').val(model.currentCat.src);
            $('#admin-clicks').val(model.currentCat.clicks);
        },
        saveAdmin: () => {
            if ($('#admin-name').val() !== '') {
                model.currentCat.name = $('#admin-name').val();
                listView.init();
            }
            if ($('#admin-imgUrl').val() !== '') {
                model.currentCat.src = $('#admin-imgUrl').val();
            }
            if ($('#admin-clicks').val() !== '') {
                model.currentCat.clicks = $('#admin-clicks').val();
            }
            catView.render();
            $('#admin-form').hide();
        },
        closeAdmin: () => {
            $('#admin-form').hide();
        }
    };



    const listView = {
        init: () => {
            const catList = $('.cat-names');
            let htmlStr = '';
            octopus.getCats().forEach(cat => {
                htmlStr += `<li><button id=${cat.id}>${cat.name}</button></li>`;
            });
            catList.html(htmlStr);
            octopus.addListEvents();
        }
    };


    const catView = {
        render: () => {
            const cat = octopus.getCurrentCat();
            const catDiv = $('.cat');
            const htmlStr = `<p id="cat-name">${cat.name}</p>
                            <img src="${cat.src}" width="360px" id="cat-img">
                            <p id="cat-clicks">Clicks: ${cat.clicks}</p>`
            catDiv.html(htmlStr);
            octopus.addCatEvents();
        }
    };

    const adminView = {
        init: () => {
            $('#admin-form').hide();
            $('#admin-btn').on('click', () => {
                octopus.showAdmin();
            });
            $('#admin-save').on('click', () => {
                octopus.saveAdmin();
            })
            $('#admin-cancel').on('click', () => {
                octopus.closeAdmin();
            })
        }
    };

    octopus.init();
});