document.addEventListener('DOMContentLoaded', function () {
    let datetimeInput = document.getElementById('datetimeInput');
    let linksList = document.getElementById('linksList');
    let linkTitleInput = document.getElementById('linkTitle');
    let linkURLInput = document.getElementById('linkURL');
    let notesTextarea = document.getElementById('noteTextarea');
    let newsList = document.getElementById('newsList');

    
    let savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
    savedLinks.forEach(link => addLinkToUI(link.title, link.url));

   
    notesTextarea.value = localStorage.getItem('savedNotes') || '';

    datetimeInput.addEventListener('input', function () {
        let datetimeValue = datetimeInput.value;
        displayDatetime(datetimeValue);
    });

    setInterval(function () {
        let currentDatetime = new Date().toLocaleString();
        displayDatetime(currentDatetime);
    }, 1000);

    function displayDatetime(datetime) {
        let displayContainer = document.querySelector('.dashboard');
        let titleContainer = displayContainer.querySelector('#dashboardTitle');

        titleContainer.textContent = titleContainer.textContent;

        let datetimeContainer = displayContainer.querySelector('#datetimeInput');
        if (!datetimeContainer) {
            datetimeContainer = document.createElement('input');
            datetimeContainer.type = 'datetime-local';
            datetimeContainer.id = 'datetimeInput';
            displayContainer.appendChild(datetimeContainer);
        }
        datetimeContainer.value = datetime;
    }

    window.addLink = function() {
        let title = linkTitleInput.value.trim();
        let url = linkURLInput.value.trim();

        if (title !== '' && url !== '') {
            addLinkToUI(title, url);

          
            savedLinks.push({ title, url });
            localStorage.setItem('savedLinks', JSON.stringify(savedLinks));

          
            linkTitleInput.value = '';
            linkURLInput.value = '';
        }
    }

    function addLinkToUI(title, url) {
        let linkItem = document.createElement('li');
        linkItem.innerHTML = `<i class="fas fa-link"></i> <a href="${url}" target="_blank">${title}</a> <button onclick="removeLink(this)"><i class="fas fa-trash"></i></button>`;
        linksList.appendChild(linkItem);
    }

    window.removeLink = function(button) {
        let listItem = button.parentElement;
        let linkTitle = listItem.querySelector('a').textContent;

       
        listItem.remove();

       
        savedLinks = savedLinks.filter(link => link.title !== linkTitle);
        localStorage.setItem('savedLinks', JSON.stringify(savedLinks));
    }

    window.fetchRandomImage = function() {
        const unsplashApiKey = 'W7Kq8vYaJAQPAF-dVdUj5W2W81xPDYFmZ3C8f6M-rqQ';
        const apiUrl = `https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              
                const imageUrl = data.urls.regular;

               
                document.body.style.backgroundImage = `url('${imageUrl}')`;
            })
            .catch(error => console.error('Error fetching random image:', error));
    }

    window.fetchLatestNews = function() {
        const apiKey = '20893b77fda54682a18708ab26fc9593';
        const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

        fetch(newsUrl)
            .then(response => response.json())
            .then(data => handleNewsResponse(data))
            .catch(error => console.error('Error fetching news:', error));
    }

    function handleNewsResponse(data) {
        if (data.status === 'ok') {
            removeAllItems(newsList);

            data.articles.forEach(article => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${article.title}</strong> - ${article.description}`;
                newsList.appendChild(listItem);
            });
        } else {
            console.error('News API response error:', data);
            alert('Error fetching news. Please try again later.');
        }
    }

    function removeAllItems(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    
    notesTextarea.addEventListener('input', function () {
        localStorage.setItem('savedNotes', notesTextarea.value);
    });
});





document.addEventListener('DOMContentLoaded', function() {
    let dashboardTitle = document.getElementById('dashboardTitle');

   
    let savedDashboardTitle = localStorage.getItem('savedDashboardTitle');
    if (savedDashboardTitle) {
        dashboardTitle.innerText = savedDashboardTitle;
    }

  
    dashboardTitle.addEventListener('input', function() {
        localStorage.setItem('savedDashboardTitle', dashboardTitle.innerText);
    });
});




