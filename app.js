var newMemberAddBtn = document.querySelector('.addMemberBtn'),
darkBg = document.querySelector('.dark_bg'),
popupForm = document.querySelector('.popup'),
crossBtn = document.querySelector('.closeBtn'),
submitBtn = document.querySelector('.submitBtn'),
 modalTitle = document.querySelector('.modalTitle'),
 popupFooter = document.querySelector('.popupFooter'),
 imgInput = document.querySelector('.img'),
 imgHolder = document.querySelector('.imgholder')
 form = document.querySelector('form'),
 formInputFields = document.querySelectorAll('form input'),
  uploadimg = document.querySelector("#uploadimg"),
  fName = document.getElementById("fName"),
  lName = document.getElementById("lName"),
  age = document.getElementById("age"),
  city = document.getElementById("city"),
  position = document.getElementById("position"),
  salary = document.getElementById("salary"),
  sDate = document.getElementById("sDate"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  entries = document.querySelector(".showEntries"),
  tabSize = document.getElementById("table_size"),
  userInfo = document.querySelector(".userInfo"),
  table = document.querySelector("table"),
  filterData = document.getElementById("search")

let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
let getData = [...originalData]


let isEdit = false, editId

var arrayLength = 0
var tableSize = 10
var startIndex = 1
var endIndex = 0
var currentIndex = 1
var maxIndex = 0

showInfo()


newMemberAddBtn.addEventListener('click', ()=> {
    isEdit = false
    submitBtn.innerHTML = "Submit"
    modalTitle.innerHTML = "Fill the Form"
    popupFooter.style.display = "block"
    imgInput.src = "./img/pic1.png"
    darkBg.classList.add('active')
    popupForm.classList.add('active')
})

crossBtn.addEventListener('click', ()=>{
    darkBg.classList.remove('active')
    popupForm.classList.remove('active')
    form.reset()
})

uploadimg.onchange = function(){
    if(uploadimg.files[0].size < 1000000){   // 1MB = 1000000
        var fileReader = new FileReader()

        fileReader.onload = function(e){
            var imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(uploadimg.files[0])
    }

    else{
        alert("This file is too large!")
    }

}

function preLoadCalculations(){
    array = getData
    arrayLength = array.length
    maxIndex = arrayLength / tableSize

    if((arrayLength % tableSize) > 0){
        maxIndex++
    }
}



function displayIndexBtn()


// ============================================
// HERO COMPONENT
// ============================================
/**
 * Hero Component - A reusable, configurable landing page hero section
 * 
 * This component enhances the existing semantic HTML hero section with
 * interactive behaviors including smooth scrolling, navigation, and
 * configurable CTA actions.
 * 
 * Usage:
 *   Hero.init({
 *     headline: 'Custom Headline',
 *     primaryCTA: { label: 'Start Now', action: 'scroll', target: '#contact' },
 *     secondaryCTA: { label: 'Learn More', action: 'navigate', target: '/about' }
 *   });
 */
const Hero = (function() {
    'use strict';

    // Default configuration matching the user story requirements
    const defaults = {
        headline: 'Build Smarter Digital Products',
        subheadline: 'We design and engineer scalable software solutions that help startups and enterprises move faster with confidence.',
        primaryCTA: {
            label: 'Get Started',
            action: 'scroll',        // 'scroll' | 'navigate' | Function
            target: '#contact',      // CSS selector or URL
            fallbackUrl: '/contact'  // Used if scroll target not found
        },
        secondaryCTA: {
            label: 'Talk to Us',
            action: 'navigate',      // 'navigate' | Function
            target: '/booking',      // URL
            fallbackUrl: '/contact'  // Used if booking route unavailable
        },
        image: {
            src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
            alt: 'Abstract illustration representing modern digital products',
            aspectRatio: '3/2'
        },
        theme: 'light'                // 'light' | 'dark'
    };

    // Store merged configuration
    let config = {};

    /**
     * Deep merge utility for configuration objects
     * @param {Object} target - Target object
     * @param {Object} source - Source object to merge
     * @returns {Object} Merged object
     */
    function mergeConfig(target, source) {
        const result = { ...target };
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = mergeConfig(target[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        return result;
    }

    /**
     * Smooth scroll to a target element
     * @param {string} target - CSS selector for target element
     * @returns {boolean} True if target found and scrolled, false otherwise
     */
    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return true;
        }
        return false;
    }

    /**
     * Navigate to a URL
     * @param {string} url - URL to navigate to
     */
    function navigateTo(url) {
        if (url && typeof url === 'string') {
            window.location.href = url;
        }
    }

    /**
     * Handle primary CTA click
     * Default: Scroll to #contact if present, otherwise navigate to /contact
     */
    function handlePrimaryCTA() {
        const { action, target, fallbackUrl } = config.primaryCTA;

        // If action is a custom function, call it
        if (typeof action === 'function') {
            action(config.primaryCTA);
            return;
        }

        // Default scroll behavior
        if (action === 'scroll') {
            const scrolled = smoothScrollTo(target);
            if (!scrolled && fallbackUrl) {
                navigateTo(fallbackUrl);
            }
            return;
        }

        // Navigate behavior
        if (action === 'navigate') {
            navigateTo(target || fallbackUrl);
        }
    }

    /**
     * Handle secondary CTA click
     * Default: Navigate to /booking, fallback to /contact
     */
    function handleSecondaryCTA() {
        const { action, target, fallbackUrl } = config.secondaryCTA;

        // If action is a custom function, call it
        if (typeof action === 'function') {
            action(config.secondaryCTA);
            return;
        }

        // Default navigate behavior with fallback
        const destination = target || fallbackUrl || '/contact';
        navigateTo(destination);
    }

    /**
     * Update hero content from configuration
     * @param {HTMLElement} container - Hero container element
     */
    function updateContent(container) {
        // Update headline
        const headlineEl = container.querySelector('.hero-headline');
        if (headlineEl && config.headline) {
            headlineEl.textContent = config.headline;
        }

        // Update subheadline
        const subheadlineEl = container.querySelector('.hero-subheadline');
        if (subheadlineEl && config.subheadline) {
            subheadlineEl.textContent = config.subheadline;
        }

        // Update primary CTA
        const primaryCTAEl = container.querySelector('[data-hero-action="get-started"]');
        if (primaryCTAEl && config.primaryCTA.label) {
            primaryCTAEl.textContent = config.primaryCTA.label;
        }

        // Update secondary CTA
        const secondaryCTAEl = container.querySelector('[data-hero-action="talk-to-us"]');
        if (secondaryCTAEl && config.secondaryCTA.label) {
            secondaryCTAEl.textContent = config.secondaryCTA.label;
        }

        // Update image
        const imageEl = container.querySelector('.hero-image');
        if (imageEl) {
            if (config.image.src) imageEl.src = config.image.src;
            if (config.image.alt) imageEl.alt = config.image.alt;
            if (config.image.aspectRatio) {
                imageEl.style.aspectRatio = config.image.aspectRatio;
            }
        }

        // Apply theme
        if (config.theme) {
            container.setAttribute('data-theme', config.theme);
        }
    }

    /**
     * Attach event listeners to CTA buttons
     * @param {HTMLElement} container - Hero container element
     */
    function attachEventListeners(container) {
        const primaryCTA = container.querySelector('[data-hero-action="get-started"]');
        const secondaryCTA = container.querySelector('[data-hero-action="talk-to-us"]');

        if (primaryCTA) {
            primaryCTA.addEventListener('click', handlePrimaryCTA);
            
            // Keyboard accessibility - handle Enter and Space
            primaryCTA.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePrimaryCTA();
                }
            });
        }

        if (secondaryCTA) {
            secondaryCTA.addEventListener('click', handleSecondaryCTA);
            
            // Keyboard accessibility - handle Enter and Space
            secondaryCTA.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSecondaryCTA();
                }
            });
        }
    }

    /**
     * Handle image load error
     * @param {HTMLElement} container - Hero container element
     */
    function handleImageError(container) {
        const imageEl = container.querySelector('.hero-image');
        if (imageEl) {
            imageEl.addEventListener('error', () => {
                // Show placeholder background instead of broken image
                imageEl.style.display = 'none';
                const visualContainer = container.querySelector('.hero-visual');
                if (visualContainer) {
                    visualContainer.classList.add('hero-visual-placeholder');
                }
            });
        }
    }

    // Public API
    return {
        /**
         * Initialize the Hero component
         * @param {Object} options - Configuration options to override defaults
         * @param {string} selector - CSS selector for hero container (default: '#hero')
         */
        init(options = {}, selector = '#hero') {
            // Merge configuration
            config = mergeConfig(defaults, options);

            // Find hero container
            const container = document.querySelector(selector);
            if (!container) {
                console.warn(`Hero component: Container not found for selector "${selector}"`);
                return this;
            }

            // Update content from config
            updateContent(container);

            // Attach event listeners
            attachEventListeners(container);

            // Handle image errors gracefully
            handleImageError(container);

            // Mark as initialized
            container.setAttribute('data-hero-initialized', 'true');

            return this;
        },

        /**
         * Get current configuration
         * @returns {Object} Current configuration
         */
        getConfig() {
            return { ...config };
        },

        /**
         * Update configuration dynamically
         * @param {Object} options - New configuration options
         */
        update(options) {
            config = mergeConfig(config, options);
            const container = document.querySelector('#hero');
            if (container) {
                updateContent(container);
            }
            return this;
        },

        /**
         * Programmatically trigger primary CTA action
         */
        triggerPrimary() {
            handlePrimaryCTA();
        },

        /**
         * Programmatically trigger secondary CTA action
         */
        triggerSecondary() {
            handleSecondaryCTA();
        }
    };
})();


// ============================================
// INITIALIZE HERO COMPONENT ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    Hero.init();
});{
    preLoadCalculations()

    const pagination = document.querySelector('.pagination')

    pagination.innerHTML = ""

    pagination.innerHTML = '<button onclick="prev()" class="prev">Previous</button>'

    for(let i=1; i<=maxIndex; i++){
        pagination.innerHTML += '<button onclick= "paginationBtn('+i+')" index="'+i+'">'+i+'</button>'
    }

    pagination.innerHTML += '<button onclick="next()" class="next">Next</button>'

    highlightIndexBtn()
}


function highlightIndexBtn(){
    startIndex = ((currentIndex - 1) * tableSize) + 1
    endIndex = (startIndex + tableSize) - 1

    if(endIndex > arrayLength){
        endIndex = arrayLength
    }

    if(maxIndex >= 2){
        var nextBtn = document.querySelector(".next")
        nextBtn.classList.add("act")
    }


    entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`

    var paginationBtns = document.querySelectorAll('.pagination button')
    paginationBtns.forEach(btn => {
        btn.classList.remove('active')
        if(btn.getAttribute('index') === currentIndex.toString()){
            btn.classList.add('active')
        }
    })


    showInfo()
}




function showInfo(){
    document.querySelectorAll(".employeeDetails").forEach(info => info.remove())

    var tab_start = startIndex - 1
    var tab_end = endIndex

    if(getData.length > 0){
        for(var i=tab_start; i<tab_end; i++){
            var staff = getData[i]


            if(staff){
                let createElement = `<tr class = "employeeDetails">
                <td>${i+1}</td>
                <td><img src="${staff.picture}" alt="" width="40" height="40"></td>
                <td>${staff.fName + " " + staff.lName}</td>
                <td>${staff.ageVal}</td>
                <td>${staff.cityVal}</td>
                <td>${staff.positionVal}</td>
                <td>${staff.salaryVal}</td>
                <td>${staff.sDateVal}</td>
                <td>${staff.emailVal}</td>
                <td>${staff.phoneVal}</td>
                <td>
                    <button onclick="readInfo('${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}')"><i class="fa-regular fa-eye"></i></button>

                    <button onclick="editInfo('${i}', '${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}')"><i class="fa-regular fa-pen-to-square"></i></button>


                    <button onclick = "deleteInfo(${i})"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>`

                userInfo.innerHTML += createElement
                table.style.minWidth = "1400px"
            }
        }
    }


    else{
        userInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">No data available in table</td></tr>`
        table.style.minWidth = "1400px"
    }
}

showInfo()


function readInfo(pic, fname, lname, Age, City, Position, Salary, SDate, Email, Phone){
    imgInput.src = pic
    fName.value = fname
    lName.value = lname
    age.value = Age
    city.value = City
    position.value = Position
    salary.value = Salary
    sDate.value = SDate
    email.value = Email
    phone.value = Phone

    darkBg.classList.add('active')
    popupForm.classList.add('active')
    popupFooter.style.display = "none"
    modalTitle.innerHTML = "Profile"
    formInputFields.forEach(input => {
        input.disabled = true
    })


    imgHolder.style.pointerEvents = "none"
}

function editInfo(id, pic, fname, lname, Age, City, Position, Salary, SDate, Email, Phone){
    isEdit = true
    editId = id

    // Find the index of the item to edit in the original data based on id
    const originalIndex = originalData.findIndex(item => item.id === id)

    // Update the original data
    originalData[originalIndex] = {
        id: id,
        picture: pic,
        fName: fname,
        lName: lname,
        ageVal: Age,
        cityVal: City,
        positionVal: Position,
        salaryVal: Salary,
        sDateVal: SDate,
        emailVal: Email,
        phoneVal: Phone
    }

    imgInput.src = pic
    fName.value = fname
    lName.value = lname
    age.value = Age
    city.value = City
    position.value = Position
    salary.value = Salary
    sDate.value = SDate
    email.value = Email
    phone.value = Phone


    darkBg.classList.add('active')
    popupForm.classList.add('active')
    popupFooter.style.display = "block"
    modalTitle.innerHTML = "Update the Form"
    submitBtn.innerHTML = "Update"
    formInputFields.forEach(input => {
        input.disabled = false
    })


    imgHolder.style.pointerEvents = "auto"
}

function deleteInfo(index){
    if(confirm("Aer you sure want to delete?")){
        originalData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(originalData));
        
        // Update getData after deleting the record
        getData = [...originalData];

        preLoadCalculations()

        if(getData.length === 0){
            currentIndex = 1
            startIndex = 1
            endIndex = 0
        }
        else if(currentIndex > maxIndex){
            currentIndex = maxIndex
        }

        showInfo()
        highlightIndexBtn()
        displayIndexBtn()

        var nextBtn = document.querySelector('.next')
        var prevBtn = document.querySelector('.prev')

        if(Math.floor(maxIndex) > currentIndex){
            nextBtn.classList.add("act")
        }
        else{
            nextBtn.classList.remove("act")
        }


        if(currentIndex > 1){
            prevBtn.classList.add('act')
        }
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        id: Date.now(),
        picture: imgInput.src == undefined ? "./img/pic1.png" :imgInput.src,
        fName: fName.value,
        lName: lName.value,
        ageVal: age.value,
        cityVal: city.value,
        positionVal: position.value,
        salaryVal: salary.value,
        sDateVal: sDate.value,
        emailVal: email.value,
        phoneVal: phone.value
    }

    if(!isEdit){
        originalData.unshift(information)
    }
    else{
        originalData[editId] = information
    }
    getData = [...originalData]
    localStorage.setItem('userProfile', JSON.stringify(originalData))

    submitBtn.innerHTML = "Submit"
    modalTitle.innerHTML = "Fill the Form"

    darkBg.classList.remove('active')
    popupForm.classList.remove('active')
    form.reset()


    highlightIndexBtn()
    displayIndexBtn()
    showInfo()

    var nextBtn = document.querySelector(".next")
    var prevBtn = document.querySelector(".prev")
    if(Math.floor(maxIndex) > currentIndex){
        nextBtn.classList.add("act")
    }
    else{
        nextBtn.classList.remove("act")
    }


    if(currentIndex > 1){
        prevBtn.classList.add("act")
    }
})


function next(){
    var prevBtn = document.querySelector('.prev')
    var nextBtn = document.querySelector('.next')

    if(currentIndex <= maxIndex - 1){
        currentIndex++
        prevBtn.classList.add("act")

        highlightIndexBtn()
    }

    if(currentIndex > maxIndex - 1){
        nextBtn.classList.remove("act")
    }
}


function prev(){
    var prevBtn = document.querySelector('.prev')

    if(currentIndex > 1){
        currentIndex--
        prevBtn.classList.add("act")
        highlightIndexBtn()
    }

    if(currentIndex < 2){
        prevBtn.classList.remove("act")
    }
}


function paginationBtn(i){
    currentIndex = i

    var prevBtn = document.querySelector('.prev')
    var nextBtn = document.querySelector('.next')

    highlightIndexBtn()

    if(currentIndex > maxIndex - 1){
        nextBtn.classList.remove('act')
    }
    else{
        nextBtn.classList.add("act")
    }


    if(currentIndex > 1){
        prevBtn.classList.add("act")
    }

    if(currentIndex < 2){
        prevBtn.classList.remove("act")
    }
}



tabSize.addEventListener('change', ()=>{
    var selectedValue = parseInt(tabSize.value)
    tableSize = selectedValue
    currentIndex = 1
    startIndex = 1
    displayIndexBtn()
})



filterData.addEventListener("input", ()=> {
    const searchTerm = filterData.value.toLowerCase().trim()

    if(searchTerm !== ""){

        const filteredData = originalData.filter((item) => {
            const fullName = (item.fName + " " + item.lName).toLowerCase()
            const city = item.cityVal.toLowerCase()
            const position = item.positionVal.toLowerCase()

            return(
                fullName.includes(searchTerm) ||
                city.includes(searchTerm) ||
                position.includes(searchTerm)
            )
        })

        // Update the current data with filtered data
        getData = filteredData
    }

    else{
        getData = JSON.parse(localStorage.getItem('userProfile')) || []
    }


    currentIndex = 1
    startIndex = 1
    displayIndexBtn()
})


displayIndexBtn()