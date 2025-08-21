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

async function login() {                    
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
        let response = await fetch('https://uppgift4-1backend.onrender.com/api/login', {       //post förfrågan till api
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
        
        localStorage.setItem('token', data.response.token)
        console.log("token sparad", data.response.token)
        console.log(data)
        
        let sucessfulLogin = await protected()
        if(sucessfulLogin){
            window.location.href = "protected.html"
        }else{
            console.error("Åtkomst nekad: token ogiltig eller saknas")
        let error = document.getElementById("errormessage")
        error.textContent = "Inloggning misslyckades var god försök igen"
        }
        }catch (error){
        console.error('Det uppstod ett fel:', error.message);
    }
} 


async function protected() {
    const token = localStorage.getItem('token')

    if(!token){
       console.error("ingen token hittades") 
       return false;
    }

    try{
        let response = await fetch('https://uppgift4-1backend.onrender.com/api/protected', {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }) 

        if (!response.ok){
            return false
        }

        let data = await response.json()
        console.log(data)
        return true
    }catch(error){
        console.error('Det uppstod ett fel:', error.message)
        return false
    }
}

const loginForm = document.querySelector(".loginform")
if(loginForm){
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault()
        login()
    })
}

const registerForm = document.querySelector(".registerform")
if(registerForm){
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault()
        register()
    })
}