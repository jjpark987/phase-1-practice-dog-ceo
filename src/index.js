// Load the script after loading the HTML
document.addEventListener('DOMContentLoaded',() => {
    
    // Fetch, parse and add image elements to the DOM
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const imageContainer = document.getElementById('dog-image-container')
    
    fetch(imgUrl)
    .then(response => response.json())
    .then(imageData => {
        imageData.message.forEach(imageURL => displayImage(imageURL))
    })
    .catch(error => {alert('There was an error with the first fetch request.')})

    function displayImage(imageURL) {
        const imageTag = document.createElement('img')
        imageTag.src = imageURL
        imageContainer.appendChild(imageTag)
    }

    // Fetch, parse and add dog breeds to the DOM as an unordered list
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const breedListContainer = document.getElementById('dog-breeds')

    fetch(breedUrl)
    .then(response => response.json())
    .then(breedData => {
        for(const breed in breedData.message) {
            displayBreeds(breed)
        }
    })
    .catch(() => {alert('There was an error with the second fetch request.')})

    function displayBreeds(breed) {
        const breedTag = document.createElement('li')
        breedTag.className = 'breed'
        breedTag.textContent = breed
        // Add an event listener for each breed in the list: every click changes the font color
        breedTag.addEventListener('click', () => breedTag.style.color = 'blue')
        breedListContainer.appendChild(breedTag)
    }

    // Filter breeds by first letter in the dropdown
    const breedList = document.getElementsByClassName('breed')
    const dropdown = document.getElementById('breed-dropdown')

    dropdown.addEventListener('change', hideNonmatchingBreeds)

    function hideNonmatchingBreeds(event) {
        for(const breed of breedList) {
            if(breed.textContent.toString()[0] !== event.target.value) {
                breed.hidden = true
            } else {
                breed.hidden = false
            }
        }
    }

    // Add the other letters of the alphabet to the dropdown
    for(let i = 101; i <= 122; i ++) {
        const option = document.createElement('option')
        option.value = `${String.fromCharCode(i)}`
        option.textContent = String.fromCharCode(i)
        dropdown.appendChild(option)
    }
})
