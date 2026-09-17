"use strict";

/* ======================================================
   DATA TRANSFER (From Product/Workshop pages)
   ====================================================== */

// ---- From product page to enquiry.html ----
function storeitem(item_id) {
    sessionStorage.setItem("product_id", item_id);
    window.location.replace("enquiry.html");
}

// ---- From promotion page to enquiry.html ----
function storepromo(promo_id) {
    sessionStorage.setItem("promo_id", promo_id);
    window.location.replace("enquiry.html");
}

// ---- From workshop page to register.html ----
function storeworkshop(workshop_id) {
    sessionStorage.setItem("workshop_id", workshop_id);
    window.location.replace("register.html");
}

/* ======================================================
   POPULATE DROPDOWN LISTS
   ====================================================== */

// ---------- Product List ----------
function productlist1() {
    var select = document.getElementById("product");
    if (!select) return; // Stop if element isn't on this page
    var products = [
        "Red Roses Bouquet", "Pink Roses Bouquet", "Gold Roses Bouquet", "Roses with Babybreath Bouquet",
        "Mix Flowers Bouquet Variant 1", "Mix Flowers Bouquet Variant 2", "Mix Flowers Bouquet Variant 3",
        "Gerbera Mix Bouquet", "Hydrangeas Bouquet Variant 1", "Hydrangeas Bouquet Variant 2",
        "Hydrangeas Bouquet Variant 3", "Gerbera Bouquet", "Graduation Bouquet Variant 1",
        "Graduation Bouquet Variant 2", "Graduation Bouquet Variant 3", "Sunflower Bouquet",
        "Carnations Bouquet", "Lilies Bouquet", "Peony Bouquet", "Dahlia Bouquet", "Christmas Bouquet",
        "Valentines Bouquet", "Mother’s Day Bouquet", "Bridal ROM Bouquet", "2025 CNY Floral Option1",
        "2025 CNY Floral Option2", "2025 CNY Floral Option3", "2025 CNY Floral Option4", "2025 CNY Floral Option5",
        "2025 CNY Floral Option6", "2025 CNY Floral Option7", "2025 CNY Floral Option8", "2025 CNY Floral Option9",
        "2025 CNY Floral Option10", "2025 CNY Floral Option11", "2025 CNY Floral Option12"
    ];

    if (select) {
        for (var i = 0; i < products.length; i++) {
            var opt = document.createElement("option");
            opt.textContent = products[i];
            opt.value = products[i];
            select.appendChild(opt);
        }
        var storedProduct = sessionStorage.getItem("product_id");
        if (storedProduct) {
            select.value = storedProduct;
        }
    }
}

// ---------- Promotion List ----------
function promotionlist1() {
    var select = document.getElementById("promotion");
    if (!select) return; // Stop if element isn't on this page
    var promotions = [
        "2022 Mother’s Day Flowers & Gifts",
        "2022 Valentine’s Day Flowers",
        "2024 Valentine’s Day Flowers",
    ];

    if (select) {
        for (var i = 0; i < promotions.length; i++) {
            var opt = document.createElement("option");
            opt.textContent = promotions[i];
            opt.value = promotions[i];
            select.appendChild(opt);
        }
        var storedPromo = sessionStorage.getItem("promo_id");
        if (storedPromo) {
            select.value = storedPromo;
        }
    }
}

// ---------- Workshop List ----------
function workshoplist1() {
    var select = document.getElementById("workshop");
    if (!select) return; // Stop if element isn't on this page
    var workshops = [
        "Hand Bouquet Workshop",
        "Hobby Class Workshop",
        "Florist to be Workshop 1",
        "Florist to be Workshop 2"
    ];

    if (select) {
        for (var i = 0; i < workshops.length; i++) {
            var opt = document.createElement("option");
            opt.textContent = workshops[i];
            opt.value = workshops[i];
            select.appendChild(opt);
        }
        var storedWorkshop = sessionStorage.getItem("workshop_id");
        if (storedWorkshop) {
            select.value = storedWorkshop;
        }
    }
}

/* ======================================================
   ENHANCEMENT 2: AUTO-FILL SUBJECT & CLEAR CONFLICTS
   ====================================================== */
function displayitem() {
    var subjectBox = document.getElementById("subject");
    if (!subjectBox) return; // Stop if not on a form page

    var product = sessionStorage.getItem("product_id");
    var promo = sessionStorage.getItem("promo_id");
    var workshop = sessionStorage.getItem("workshop_id");

    if (workshop) {
        subjectBox.value = "RE: Registration for " + workshop;
    } else if (product) {
        subjectBox.value = "RE: Enquiry on " + product;
    } else if (promo) {
        subjectBox.value = "RE: Enquiry on " + promo;
    } else {
        subjectBox.value = "";
    }
}

/* Update subject when user changes dropdown */
function changeProduct() {
    const productSelect = document.getElementById("product");
    const promoSelect = document.getElementById("promotion");
    const subjectBox = document.getElementById("subject");
    const selectedProduct = productSelect.value;
    if (selectedProduct !== "") {
        promoSelect.selectedIndex = 0;
        sessionStorage.removeItem("promo_id");
        sessionStorage.setItem("product_id", selectedProduct);
        subjectBox.value = "RE: Enquiry on " + selectedProduct;
    } else {
        sessionStorage.removeItem("product_id");
        subjectBox.value = "";
    }
}

function changePromotion() {
    const promoSelect = document.getElementById("promotion");
    const productSelect = document.getElementById("product");
    const subjectBox = document.getElementById("subject");
    const selectedPromo = promoSelect.value;
    if (selectedPromo !== "") {
        productSelect.selectedIndex = 0;
        sessionStorage.removeItem("product_id");
        sessionStorage.setItem("promo_id", selectedPromo);
        subjectBox.value = "RE: Enquiry on " + selectedPromo;
    } else {
        sessionStorage.removeItem("promo_id");
        subjectBox.value = "";
    }
}

function changeWorkshop() {
    const workshopSelect = document.getElementById("workshop");
    const subjectBox = document.getElementById("subject");
    const selectedWorkshop = workshopSelect.value;
    if (selectedWorkshop !== "") {
        sessionStorage.setItem("workshop_id", selectedWorkshop);
        subjectBox.value = "RE: Registration for " + selectedWorkshop;
    } else {
        sessionStorage.removeItem("workshop_id");
        subjectBox.value = "";
    }
}

/* ======================================================
   ARRAY NAVIGATION BAR
   ====================================================== */

function buildNav() {
    const navList = document.getElementById("navList");
    if (!navList) return;
    const navItems = [
        { name: "Home", link: "index.html" },
        {
            name: "Products ▾",
            link: "index.html#products",
            dropdown: [
                { name: "Hand Bouquet", link: "product1_HandBouquet.html" },
                { name: "CNY Decoration", link: "product2_CNYDecoration.html" }
            ]
        },
        {
            name: "Activities ▾",
            link: "index.html#activities",
            dropdown: [
                { name: "Workshop", link: "workshop.html" },
                { name: "Promotion", link: "promotion.html" }
            ]
        },
        { name: "Workshop Register", link: "register.html" },
        { name: "Enquiry", link: "enquiry.html" },
        { name: "About Me", link: "aboutme1.html" }
    ];

    navList.innerHTML = "";
    navItems.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("index-nav-item");
        if (item.dropdown) {
            li.classList.add("index-dropdown");
            const a = document.createElement("a");
            a.href = item.link;
            a.textContent = item.name;
            a.classList.add("dropbtn");
            li.appendChild(a);
            const dropdownDiv = document.createElement("div");
            dropdownDiv.classList.add("dropdown-content");
            item.dropdown.forEach(sub => {
                const subLink = document.createElement("a");
                subLink.href = sub.link;
                subLink.textContent = sub.name;
                dropdownDiv.appendChild(subLink);
            });
            li.appendChild(dropdownDiv);
        } else {
            const a = document.createElement("a");
            a.href = item.link;
            a.textContent = item.name;
            li.appendChild(a);
        }
        navList.appendChild(li);
    });
    const logoLi = document.createElement("li");
    logoLi.classList.add("index-logo");
    logoLi.innerHTML = `
        <a href="index.html">
            <img src="images/flowerlogo.jpg" alt="Root Flower Logo">
        </a>
    `;
    navList.prepend(logoLi);
}

/* ===========================================================
   FORM HELPER FUNCTIONS
   =========================================================== */

function valById(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
}

function valByName(name) {
    var el = document.getElementsByName(name);
    return el && el[0] ? el[0].value.trim() : "";
}

function radioChecked(name) {
    var radios = document.getElementsByName(name);
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i].value;
    }
    return "";
}

/* ===========================================================
   ENHANCMENT 3: DUAL-FEEDBACK FORM VALIDATION
   =========================================================== */

/* Helper function to show/hide inline errors */
function setInlineError(id, message) {
    var errorSpan = document.getElementById(id);
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = (message === "") ? "none" : "block";
    }
}

/* ===========================================================
FORM VALIDATION
   =========================================================== */

/* ENQUIRY FORM VALIDATION */
function attachEnquiryValidation() {
    var form = document.querySelector(".enquiry-main form");
    if (form) {
        form.onsubmit = validateEnquiryForm;
    }
}

function validateEnquiryForm() {
    var errors = [];

    var errorSpans = document.querySelectorAll(".enquiry-main .error-message");
    errorSpans.forEach(function(span) {
        span.style.display = "none";
        span.textContent = "";
    });

    var subject = valById("subject");
    if (!subject) {
        errors.push("Subject is required.");
        setInlineError("subject_error", "Subject is required.");
    }

    var product = valById("product");
    var promotion = valById("promotion");
    if (!product && !promotion) {
        errors.push("Please select a Product or a Promotion.");
        setInlineError("product_promo_error", "Please select a Product or a Promotion.");
    }

    var comments = valByName("comments");
    if (!comments) {
        errors.push("Comments are required.");
        setInlineError("comments_error", "Comments are required.");
    }

    var fname = valByName("fname");
    if (!fname) {
        errors.push("First name is required.");
        setInlineError("fname_error", "First name is required.");
    }

    var lname = valByName("lname");
    if (!lname) {
        errors.push("Last name is required.");
        setInlineError("lname_error", "Last name is required.");
    }

    var email = valByName("email");
    if (!email) {
        errors.push("Email is required.");
        setInlineError("email_error", "Email is required.");
    }

    var phone = valByName("phone");
    if (!phone) {
        errors.push("Phone number is required.");
        setInlineError("phone_error", "Phone number is required.");
    }

    var street = valByName("street");
    if (!street) {
        errors.push("Street address is required.");
        setInlineError("street_error", "Street address is required.");
    }

    var city = valByName("city");
    if (!city) {
        errors.push("City/Town is required.");
        setInlineError("city_error", "City/Town is required.");
    }

    var state = (document.querySelector('.enquiry-main select[name="state"]') || {}).value || "";
    if (state === "" || state === "--Select--") {
        errors.push("State is required.");
        setInlineError("state_error", "State is required.");
    }

    var postcode = valByName("postcode");
    if (!postcode) {
        errors.push("Postcode is required.");
        setInlineError("postcode_error", "Postcode is required.");
    }

    var contact = radioChecked("contact");
    if (!contact) {
        errors.push("Preferred contact method is required.");
        setInlineError("contact_error", "Preferred contact method is required.");
    }

    if (fname && !/^[A-Za-z ]{1,25}$/.test(fname)) {
        var msg = "First name: letters and spaces only (max 25).";
        errors.push(msg);
        setInlineError("fname_error", msg);
    }
    if (lname && !/^[A-Za-z ]{1,25}$/.test(lname)) {
        var msg = "Last name: letters and spaces only (max 25).";
        errors.push(msg);
        setInlineError("lname_error", msg);
    }
    if (email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        var msg = "Invalid email format.";
        errors.push(msg);
        setInlineError("email_error", msg);
    }
    if (phone && !/^\d{10}$/.test(phone)) {
        var msg = "Phone must be exactly 10 digits.";
        errors.push(msg);
        setInlineError("phone_error", msg);
    }
    if (postcode && !/^\d{5}$/.test(postcode)) {
        var msg = "Postcode must be exactly 5 digits.";
        errors.push(msg);
        setInlineError("postcode_error", msg);
    }

    if (errors.length) {
        alert("Please fix the following:\n\n" + errors.join("\n"));
        return false; // STOPS submission
    } else {
        storeFormData("enquiry");
        return true; // ALLOWS submission
    }
}

/* REGISTER FORM VALIDATION */
function attachRegisterValidation() {
    var form = document.querySelector(".register-main form");
    if (form) {
        form.onsubmit = validateRegisterForm;
    }
}

function validateRegisterForm() {
    var errors = [];

    var errorSpans = document.querySelectorAll(".register-main .error-message");
    errorSpans.forEach(function(span) {
        span.style.display = "none";
        span.textContent = "";
    });

    var subject = valById("subject");
    if (!subject) {
        errors.push("Subject is required.");
        setInlineError("subject_error", "Subject is required.");
    }

    var workshop = valById("workshop");
    if (workshop === "" || workshop === "-- Select a Topics --") {
        errors.push("Please select a workshop.");
        setInlineError("workshop_error", "Please select a workshop.");
    }
    var comments = valByName("comments");
    if (!comments) {
        errors.push("Comments are required.");
        setInlineError("comments_error", "Comments are required.");
    }

    var session = radioChecked("session");
    if (!session) {
        errors.push("Please select a session time.");
        setInlineError("session_error", "Please select a session time.");
    }
    var start = (document.querySelector('.register-main input[name="start_date"]') || {}).value || "";
    if (!start) {
        errors.push("Start date is required.");
        setInlineError("start_date_error", "Start date is required.");
    }

    var end = (document.querySelector('.register-main input[name="end_date"]') || {}).value || "";
    if (!end) {
        errors.push("End date is required.");
        setInlineError("end_date_error", "End date is required.");
    }

    var participants = valByName("participants");
    if (!participants) {
        errors.push("Number of participants is required.");
        setInlineError("participants_error", "Number of participants is required.");
    }

    var fname = valByName("fname");
    if (!fname) {
        errors.push("First name is required.");
        setInlineError("fname_error", "First name is required.");
    }

    var lname = valByName("lname");
    if (!lname) {
        errors.push("Last name is required.");
        setInlineError("lname_error", "Last name is required.");
    }

    var email = valByName("email");
    if (!email) {
        errors.push("Email is required.");
        setInlineError("email_error", "Email is required.");
    }

    var phone = valByName("phone");
    if (!phone) {
        errors.push("Phone is required.");
        setInlineError("phone_error", "Phone is required.");
    }

    var street = (document.querySelector('.register-main input[name="street"]') || {}).value || "";
    if (!street) {
        errors.push("Street address is required.");
        setInlineError("street_error", "Street address is required.");
    }

    var city = (document.querySelector('.register-main input[name="city"]') || {}).value || "";
    if (!city) {
        errors.push("City/Town is required.");
        setInlineError("city_error", "City/Town is required.");
    }

    var state = (document.querySelector('.register-main select[name="state"]') || {}).value || "";
    if (state === "" || state === "--Select--") {
        errors.push("State is required.");
        setInlineError("state_error", "State is required.");
    }

    var postcode = valByName("postcode");
    if (!postcode) {
        errors.push("Postcode is required.");
        setInlineError("postcode_error", "Postcode is required.");
    }

    if (participants && (isNaN(participants) || +participants <= 0 || +participants > 99)) {
        var msg = "Participants must be a number between 1 and 99.";
        errors.push(msg);
        setInlineError("participants_error", msg);
    }
    if (fname && !/^[A-Za-z ]{1,25}$/.test(fname)) {
        var msg = "First name: letters and spaces only (max 25).";
        errors.push(msg);
        setInlineError("fname_error", msg);
    }
    if (lname && !/^[A-Za-z ]{1,25}$/.test(lname)) {
        var msg = "Last name: letters and spaces only (max 25).";
        errors.push(msg);
        setInlineError("lname_error", msg);
    }
    if (email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        var msg = "Invalid email format.";
        errors.push(msg);
        setInlineError("email_error", msg);
    }
    if (phone && !/^\d{10}$/.test(phone)) {
        var msg = "Phone must be exactly 10 digits.";
        errors.push(msg);
        setInlineError("phone_error", msg);
    }
    if (postcode && !/^\d{5}$/.test(postcode)) {
        var msg = "Postcode must be exactly 5 digits.";
        errors.push(msg);
        setInlineError("postcode_error", msg);
    }

    if (start && end) {
        var s = new Date(start);
        var e = new Date(end);
        if (s > e) {
            var msg = "End date must be the same or after Start date.";
            errors.push(msg);
            setInlineError("end_date_error", msg);
        }
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (s < today) {
            var msg = "Start date cannot be in the past.";
            errors.push(msg);
            setInlineError("start_date_error", msg);
        }
    }

    if (errors.length) {
        alert("Please fix the following:\n\n" + errors.join("\n"));
        return false;
    } else {
        storeFormData("register");
        return true;
    }
}


/* ======================================================
   ENHANCEMENT 1: STORE & LOAD CONFIRMATION DATA
   ====================================================== */

/**
 * After validation succeeds, stores all form data to sessionStorage.
 * @param {string} formType - "enquiry" or "register"
 */
function storeFormData(formType) {
    if (formType === "enquiry") {
        sessionStorage.setItem("formType", "Enquiry");
        sessionStorage.setItem("fname", valByName("fname"));
        sessionStorage.setItem("lname", valByName("lname"));
        sessionStorage.setItem("email", valByName("email"));
        sessionStorage.setItem("phone", valByName("phone"));
        sessionStorage.setItem("subject", valById("subject"));
        sessionStorage.setItem("product", valById("product"));
        sessionStorage.setItem("promotion", valById("promotion"));
        sessionStorage.setItem("street", valByName("street"));
        sessionStorage.setItem("city", valByName("city"));
        sessionStorage.setItem("state", (document.querySelector('.enquiry-main select[name="state"]') || {}).value || "");
        sessionStorage.setItem("postcode", valByName("postcode"));
        sessionStorage.setItem("comments", valByName("comments"));
        sessionStorage.setItem("contact", radioChecked("contact"));

    } else if (formType === "register") {
        sessionStorage.setItem("formType", "Registration");
        sessionStorage.setItem("fname", valByName("fname"));
        sessionStorage.setItem("lname", valByName("lname"));
        sessionStorage.setItem("email", valByName("email"));
        sessionStorage.setItem("phone", valByName("phone"));
        sessionStorage.setItem("workshop", valById("workshop"));
        sessionStorage.setItem("street", (document.querySelector('.register-main input[name="street"]') || {}).value || "");
        sessionStorage.setItem("city", (document.querySelector('.register-main input[name="city"]') || {}).value || "");
        sessionStorage.setItem("state", (document.querySelector('.register-main select[name="state"]') || {}).value || "");
        sessionStorage.setItem("postcode", valByName("postcode"));
        sessionStorage.setItem("participants", valByName("participants"));
        sessionStorage.setItem("start_date", (document.querySelector('.register-main input[name="start_date"]') || {}).value || "");
        sessionStorage.setItem("end_date", (document.querySelector('.register-main input[name="end_date"]') || {}).value || "");
        sessionStorage.setItem("comments", valByName("comments"));
        sessionStorage.setItem("session", radioChecked("session"));
    }
}

function loadConfirmation() {
    // Check if we are on the confirm.html page
    if (!document.querySelector(".confirmation-main")) return;

    const type = sessionStorage.getItem("formType");
    if (!type) {
        // If no data, redirect to homepage
        window.location.href = "index.html";
        return;
    }

    // --- 1. POPULATE VISIBLE <span> TAGS (for user) ---
    document.getElementById("formType").textContent = type;
    document.getElementById("confirm_fname").textContent = sessionStorage.getItem("fname") || "";
    document.getElementById("confirm_lname").textContent = sessionStorage.getItem("lname") || "";
    document.getElementById("confirm_email").textContent = sessionStorage.getItem("email") || "";
    document.getElementById("confirm_phone").textContent = sessionStorage.getItem("phone") || "";
    document.getElementById("confirm_street").textContent = sessionStorage.getItem("street") || "";
    document.getElementById("confirm_city").textContent = sessionStorage.getItem("city") || "";
    document.getElementById("confirm_state").textContent = sessionStorage.getItem("state") || "";
    document.getElementById("confirm_postcode").textContent = sessionStorage.getItem("postcode") || "";

    // --- 2. POPULATE HIDDEN <input> TAGS (for mailto) ---
    // This part fixes the empty email bug
    document.getElementById("hidden_formType").value = type;
    document.getElementById("hidden_fname").value = sessionStorage.getItem("fname") || "";
    document.getElementById("hidden_lname").value = sessionStorage.getItem("lname") || "";
    document.getElementById("hidden_email").value = sessionStorage.getItem("email") || "";
    document.getElementById("hidden_phone").value = sessionStorage.getItem("phone") || "";
    document.getElementById("hidden_street").value = sessionStorage.getItem("street") || "";
    document.getElementById("hidden_city").value = sessionStorage.getItem("city") || "";
    document.getElementById("hidden_state").value = sessionStorage.getItem("state") || "";
    document.getElementById("hidden_postcode").value = sessionStorage.getItem("postcode") || "";

    // --- 3. LOGIC FOR DIFFERENT FORMS ---
    if (type === "Enquiry") {
        // Show and populate visible Enquiry fields
        document.getElementById("enquiry_confirm_details").style.display = "block";
        document.getElementById("confirm_subject").textContent = sessionStorage.getItem("subject") || "";
        document.getElementById("confirm_product").textContent = sessionStorage.getItem("product") || "None";
        document.getElementById("confirm_promotion").textContent = sessionStorage.getItem("promotion") || "None";
        document.getElementById("confirm_contact").textContent = sessionStorage.getItem("contact") || "Not specified";
        document.getElementById("confirm_comments_enq").textContent = sessionStorage.getItem("comments") || "None";

        // Populate hidden Enquiry fields
        document.getElementById("hidden_subject").value = sessionStorage.getItem("subject") || "";
        document.getElementById("hidden_product").value = sessionStorage.getItem("product") || "None";
        document.getElementById("hidden_promotion").value = sessionStorage.getItem("promotion") || "None";
        document.getElementById("hidden_contact").value = sessionStorage.getItem("contact") || "Not specified";
        document.getElementById("hidden_comments_enq").value = sessionStorage.getItem("comments") || "None";

    } else if (type === "Registration") {
        // Show and populate visible Register fields
        document.getElementById("register_confirm_details").style.display = "block";
        document.getElementById("confirm_workshop").textContent = sessionStorage.getItem("workshop") || "";
        document.getElementById("confirm_session").textContent = sessionStorage.getItem("session") || "Not specified";
        document.getElementById("confirm_participants").textContent = sessionStorage.getItem("participants") || "";
        document.getElementById("confirm_start_date").textContent = sessionStorage.getItem("start_date") || "";
        document.getElementById("confirm_end_date").textContent = sessionStorage.getItem("end_date") || "";
        document.getElementById("confirm_comments_reg").textContent = sessionStorage.getItem("comments") || "None";

        // Populate hidden Register fields
        document.getElementById("hidden_workshop").value = sessionStorage.getItem("workshop") || "";
        document.getElementById("hidden_session").value = sessionStorage.getItem("session") || "Not specified";
        document.getElementById("hidden_participants").value = sessionStorage.getItem("participants") || "";
        document.getElementById("hidden_start_date").value = sessionStorage.getItem("start_date") || "";
        document.getElementById("hidden_end_date").value = sessionStorage.getItem("end_date") || "";
        document.getElementById("hidden_comments_reg").value = sessionStorage.getItem("comments") || "None";
    }

    // --- 4. BIND BUTTON EVENTS ---

    // Bind the *form's* submit event
    const finalForm = document.getElementById("finalSubmitForm");
    if (finalForm) {
        finalForm.addEventListener("submit", function() {
            // This alert will show just before the email client opens
            alert("Submission Sent Successfully!");
            sessionStorage.clear();
        });
    }

    // Bind the "Cancel" button
    const cancelBtn = document.getElementById("cancelButton");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", function() {
            // Go back to the correct form
            if (type === "Enquiry") {
                window.location.href = "enquiry.html";
            } else if (type === "Registration") {
                window.location.href = "register.html";
            }
        });
    }
}


/* ======================================================
   ENHANCEMENT 5: WHATSAPP BUTTON
   ====================================================== */

function orderWhatsApp(productName) {
    const phoneNumber = "60143399709";
    const message = encodeURIComponent(`Hello, I am interested in ${productName}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}

function addGlobalWhatsAppButton() {
    const phoneNumber = "60143399709";
    const message = encodeURIComponent(`Hello, I am interested `);
    const orderBtn = document.createElement("button");
    orderBtn.className = "whatsapp-order-btn";
    orderBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> WhatsApp Us`;
    orderBtn.addEventListener("click", function() {
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    });
    document.body.appendChild(orderBtn);
}


/* ======================================================
   ENHANCEMENT 6: SCROLL TO TOP BUTTON
   ====================================================== */
function addScrollToTopButton() {
    const btn = document.getElementById("scrollTopBtn");
    if (btn) {
        window.addEventListener("scroll", function() {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            if (scrollY > 200) {
                btn.style.display = "block";
                btn.classList.add("show");
            } else {
                btn.classList.remove("show");
                setTimeout(() => {
                    if (!btn.classList.contains("show")) {
                        btn.style.display = "none";
                    }
                }, 300);
            }
        });

        btn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
}


/* =====================================================
   INITIALISATION FUNCTION 
   ====================================================== */

function smartInitialise() {
    buildNav();

    /* ========================================
    ENHANCEMENT 7 Active Navigation Link Highlighter
    =========================================== */

    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    const activePage = (currentPage === "") ? "index.html" : currentPage;

    const navLinks = document.querySelectorAll("#navList a");

    navLinks.forEach(link => {    
        const linkPage = link.href.substring(link.href.lastIndexOf('/') + 1);    
        if (linkPage === activePage) {      
            link.classList.add('active');      
            const dropdownParent = link.closest('.index-dropdown');      
            if (dropdownParent) {        
                const dropbtn = dropdownParent.querySelector('.dropbtn');        
                if (dropbtn) {          
                    dropbtn.classList.add('active');        
                }      
            }    
        }  
    });

    addGlobalWhatsAppButton();
    addScrollToTopButton();

    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);

    if (page === "enquiry.html") {
        productlist1();
        promotionlist1();
        displayitem();
        document.getElementById("product").addEventListener("change", changeProduct);
        document.getElementById("promotion").addEventListener("change", changePromotion);
        attachEnquiryValidation();
        sessionStorage.removeItem("workshop_id");

    } else if (page === "register.html") {
        workshoplist1();
        displayitem();
        document.getElementById("workshop").addEventListener("change", changeWorkshop);
        attachRegisterValidation();
        sessionStorage.removeItem("product_id");
        sessionStorage.removeItem("promo_id");

    } else if (page === "confirm.html") {
        loadConfirmation();
    }
}

window.onload = smartInitialise;