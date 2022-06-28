

const items = [
    {
        previewImage: "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        title: "cat.jpeg"
    },
    {
        previewImage: "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        title: "a man and a woman trying to cook a meal together in a modern kitchen.jpg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        title: "bali-kelingking-beach-plastic-removal-drive.key"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        title: "NextByk Investor Pitch 2022.ppt"
    },
    {
        previewImage: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        title: "interns-performance-report-may-2022.key"
    }
]

// this function truncates a string if it's too long : 
function formatString(str){
    len = str.length;
    if(len < 27)return str;

    prefix = str.substring(0,12);
    suffix = str.substring(len - 12);

    return prefix + "..." + suffix;

};

//first, we render all the items from the array:

const mainList = document.querySelector("#list-tag");
items.forEach((item,index) => {

    const newListItem = document.createElement("li");
    const newId = "Item" + (index);
    newListItem.id = newId;
    const itemName = formatString(item.title);
    const content = `<img class="small-img" src = ${item.previewImage}  alt=""> 
    ${itemName}`;
    newListItem.innerHTML = content;
    mainList.appendChild(newListItem);
});

// now, we will maintain the index of the currently shown item in a variable currentItem.

var currentItem = 0;
var sizeOfList = items.length;

// now, we write a function toggleState(newItem) which will change the currentItem to newItem

function toggleState(newItem){

    const id1 = "Item" + currentItem;
    const id2 = "Item" + newItem;
    const firstElement = document.getElementById(id1);
    const secondElement = document.getElementById(id2);
    firstElement.classList.remove("active-list-item");
    secondElement.classList.add("active-list-item");
    currentItem = newItem;

    // change the image shown : 
    const image = document.querySelector("#display-image")
    image.src = items[newItem].previewImage;

    // change the text shown in the textArea : 

    const textArea = document.querySelector("textarea");
    textArea.value = items[newItem].title;
;

};

toggleState(0);

// now, let's add the click event listener to all the list items:

const listItems = document.querySelectorAll("li");

listItems.forEach((listItem,index) => {

    listItem.addEventListener("click", () => {

        toggleState(index);

    });
});

// now, add event listeners for keypress : 


document.addEventListener("keydown", (e) => {

    if(e.key == "ArrowDown")
    {
        let nextItem = currentItem + 1;
        if(nextItem === sizeOfList)nextItem = 0;
        toggleState(nextItem);
    }
    else if(e.key == "ArrowUp")
    {
        let prevItem = currentItem - 1;
        if(prevItem === -1)prevItem = sizeOfList-1;
        toggleState(prevItem);
    }
});

// now, we will handle changes in the textarea : 

// this function will update all the information based on the text in the textarea : 

function updateName(newName){
    const currentId = "Item" + currentItem;
    const currentElement = document.getElementById(currentId);
    items[currentItem].title = newName;
    newName = formatString(newName);
    const content = `<img class="small-img" src = ${items[currentItem].previewImage}  alt=""> 
    ${newName}`;   
    currentElement.innerHTML = content; 

};

// now, add event listener to the text area : 
const textArea = document.querySelector("textarea");
textArea.addEventListener("input", () =>{
    const newName = textArea.value;
    updateName(newName);
});