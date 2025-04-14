//const iconHome = document.getElementsByClassName('icon-home')[0];

const iconHome = document.querySelector('.icon-home');
const iconUser = document.querySelector('.icon-user');
const iconLogout = document.querySelector('.icon-logout');
const fileUpload = document.getElementById('fileUpload');
let meme = null; // előkép betöltése
const newMeme = document.querySelector('.newMeme');

const uploadButton = document.querySelector('.uploadButton')

//console.log(iconHome);

iconHome.addEventListener('click', () => {
    window.location.href = '../html/home.html';
});

iconUser.addEventListener('click', () => {
    window.location.href = '../html/profile.html';
});

iconLogout.addEventListener('click', logout);

fileUpload.addEventListener('change', selectPicture);

uploadButton.addEventListener('click', uploadMeme)


async function logout() {
    const response = await fetch('http://127.0.0.1:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    console.log(response);

    const data = await response.json();

    console.log(data);

    if (response.ok) {
        window.location.href = '../index.html';
    } else {
        alert('Hiba a kijelentkezéskor!'); // ha nincsenek sütik
    }
}

function selectPicture() {
    const file = fileUpload.files[0];
    console.log(file);

    if (file) {
        meme = file;
        const reader = new FileReader();
        
        reader.onload = (event) => {
            newMeme.style.backgroundImage = `url('${event.target.result}')`;
        }
        reader.readAsDataURL(file);
    }
}

async function uploadMeme() {
    if (meme) {
        const formData = new FormData;
        formData.append('meme', meme);
        console.log(formData);
        try {
            const respond = await fetch('http://127.0.0.1:3000/api/memes/uploadMeme', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            console.log(respond);

        } catch (error) {
            console.log(error);
            alert('Nem várt hiba!');
        }
    } else {
        alert('Válassz ki egy képet!');
    }
}