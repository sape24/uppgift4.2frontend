//skapar variablar av knapp elementen i html
let openButton = document.getElementById("open-menu")
let closeButton = document.getElementById("close-menu")


//skapar en eventlistener som lyssnar efter när användare klickar på dessa element
openButton.addEventListener('click', toggleMenu)
closeButton.addEventListener('click', toggleMenu)
//function som kollar ifall mobilmenyn visas eller inte när man trycker på respektive knapp, om den inte visas så visas den och vice versa. Den ändrar knappens css ifall display är none till block annars ändras den till none
function toggleMenu(){
    let mobileMenuEl = document.getElementById("mobilemenu")
    let style = window.getComputedStyle(mobileMenuEl)

    if(style.display === "none") {
        mobileMenuEl.style.display = "block";
    } else{
        mobileMenuEl.style.display = "none"
    }
}

document.querySelector(".form").addEventListener("submit", (event) => {        //lyssnar när formuläret skickas som vid knapptryck eller enter
    event.preventDefault()                                                   //förhindrar att sidan laddas om
    register()                                                                //anropar addwork funktionen 
})

async function register() {                    
    let user = {
        username: document.getElementById("username").value,        //skapar ett objekt med värden från förmuläret
        password: document.getElementById("password").value           
    }

    if(!user.username || !user.password ){                       //validering om nått fält i förmuläret är tomt return så funktionen stoppas
        const error = document.getElementById("errormessage")
        error.textContent = ("Du måste fylla i alla fält!")             
        return                                                         
    }

    try{
    let response = await fetch('https://uppgift4-1backend.onrender.com/api/register', {       //post förfrågan till api
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'                               //anger att det är json som skickas
    },
        body: JSON.stringify(user)                                         //user objekt blir json sträng
    });
    if (!response.ok){
            throw new Error ('Nätverksproblem - felaktigt svar från servern');
        }
    
    let data = await response.json();
    console.log(data);
    window.location.href ="index.html"                                       //redirect till startsida efter lyckad POST
    } catch (error){
        console.error('Det uppstod ett fel:', error.message);
    }
} 
