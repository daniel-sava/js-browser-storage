const links = document.getElementsByClassName('link');
const visitedLinksListElement = document.getElementById('visited-links');

function initializeLinkListeners() {
    for (let link of links) {
        link.addEventListener('click', (event) => {
            if (!event) {
                return;
            }

            const element = event.target;
            let visitedLink = {
                name: element.textContent,
                url: element.getAttribute('href'),
            };

            addLinkToVisitedLinks(visitedLink);
        });
    }
}

function addLinkToVisitedLinks(link) {
    const visitedLinks = getSavedVisitedLinks();
    let filteredVisitedLinks = visitedLinks.filter((visitedLink) => {
        return visitedLink.url !== link.url;
    });

    filteredVisitedLinks.push(link);
    localStorage.setItem('visitedLinks', JSON.stringify(filteredVisitedLinks));

    syncVisitedLinksList();
}

function getSavedVisitedLinks() {
    let visitedLinks = localStorage.getItem('visitedLinks');
    visitedLinks = visitedLinks ? JSON.parse(visitedLinks) : [];

    return visitedLinks;
}

function syncVisitedLinksList() {
    visitedLinksListElement.innerHTML = '';

    const visitedLinks = getSavedVisitedLinks();
    for (let visitedLink of visitedLinks) {
        const listItemElement = document.createElement('li');
        const linkElement = document.createElement('a');
        const linkName = document.createTextNode(visitedLink.name);
        linkElement.appendChild(linkName);

        linkElement.classList.add('link');
        linkElement.setAttribute('href', visitedLink.url);

        listItemElement.appendChild(linkElement);
        visitedLinksListElement.appendChild(listItemElement);
    }
}

initializeLinkListeners();
syncVisitedLinksList();
