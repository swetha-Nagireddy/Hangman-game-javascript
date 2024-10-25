//words
var words = [
    "application",
    "friends",
    "family",
    "happy",
    "home",
    "joy",
    "happiness",
    "beautiful",
    "kind",
    "fun",
    "love",
    "peace",
    "freedom",
    "wonderful",
    "enjoy",
    "success",
    "response",
    "failure",
    "practise",
    "parents"

]

//target the dom
let wordEl = document.getElementById("word")
let wrLtEl = document.getElementById("wrong-letters")
let num = document.getElementById("num")


let plAgBtn = document.getElementById("playBtn")

let popup = document.getElementById("popup-box")
let notf = document.getElementById("notification")

let finmsg = document.getElementById("final-msg")
let finmsgwd = document.getElementById("final-msg-word")

//hangman shape
let figparts = document.querySelectorAll(".figure-part")

//declare variables
//selected word
let selectedword = words[Math.floor(Math.random() * words.length)]
     num.innerText = selectedword.length

//play option
let playable = true

//store the correct and incorrect letters

let correctletters =[]
let wrongletters =[]

//display the word

function displayWord(){
   wordEl.innerHTML =` ${selectedword.split("").map((item) => `<span class="letter"> 
    ${correctletters.includes(item) ? item : "" }</span>`).join("")}`;

    let innerword = wordEl.innerText.replace(/\n/g,"")
      if(innerword === selectedword){
        finmsg.innerText = "congratulations ! you won!..."
        finmsgwd.innerText = ""
        popup.style.display="flex"
        playable = false
      }
}
displayWord()

function showNotification(){
    notf.classList.add("show")
    setTimeout(() =>{
   notf.classList.remove("show")
    },2000)
}

//to display wrong letters

function updateWrongletters(){
    console.log(`wrong letters = `,wrongletters);
    wrLtEl.innerHTML = `${wrongletters.length > 0 ? "<p>wrong</p>" : ""}
    ${wrongletters.map((item) => `<span>${item}</span>`)}`;

    //display the hangman shape
figparts.forEach((part,index)=>{
    let errors = wrongletters.length
    index < errors ? (part.style.display = "block"):(part.style.display = "none")
});

 //if shapes are complete we have to alert the user , so he lost game

 if(wrongletters.length === figparts.length){
    finmsg.innerText = "sorry.. you lost the game.."
    finmsgwd.innerHTML = `...the correct word is <u>${selectedword}</u>`
    popup.style.display="flex"
    playable=false
 }
}

//play agian game button handler

plAgBtn.addEventListener("click",() => {
    window.location.reload()
})




//input key handler
window.addEventListener("keypress",(e)=>{
    if(playable){
        const letter = e.key.toLowerCase();
        console.log(`letters = `,letter)


        if(letter >= "a" && letter <= "z"){
            if(selectedword.includes(letter)){
                if(!correctletters.includes(letter)){
                    correctletters.push(letter)
                    displayWord()
                }else{
                    showNotification()
                }
            }else{
                if(!wrongletters.includes(letter)){
                    wrongletters.push(letter)
                    updateWrongletters()
                }else{
                    showNotification()
                }
            }
        }
    }
})