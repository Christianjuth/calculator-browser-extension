var loadedTheme = "google";
var enable = "all";
localStorage.tutorial = true;

$(document).ready(function() {

    if(navigator.appVersion.indexOf("Mac")){
        $('.mac').show();
    } else{
        $('.windows').show();
    }

    $.getJSON(chrome.extension.getURL('assets/themes/themes.json'), function(options) {
        options.sort();

        // convert theme-name to "Theme Name"
        options = options.map((option) => {
            return option.split('-').map((w) => {
                return w.charAt(0).toUpperCase() + w.slice(1);
            }).join(' ');
        }).sort().reverse();

        options.forEach((option) => {
            let file = option.replace(/\s/,'-').toLowerCase();

            $(`<option class="theme-selctor-option" value="${file}">${option}</option>`).prependTo("#theme-selctor");
        });


        option.defineSelect("#theme-selctor", "theme", (val) => {
            theme.load(val);

            if(val === 'custom')
                $('#theme-designer-link').show();
            else
                $('#theme-designer-link').hide();
        });
    });


    option.defineSelect("#calculator-type", "type", (val) => {
        if(val == "scientific")
            $('.calculator').addClass('scientific');

        else
            $('.calculator').removeClass('scientific');
    });



    // Unlock dev mode after 10 shift clicks
    let numClick = 0;
    $(".logo").click(function() {
        if(numClick == 10){
            numClick = 0;

            if(localStorage.dev == 'true'){
                localStorage.dev = 'false';
                $('body').removeClass('dev');
            } else{
                localStorage.dev = 'true';
                $('body').addClass('dev');
            }
        }

        else{
            if(event.shiftKey == true) numClick++;
            setTimeout(() =>{
                if(numClick !== 0) numClick = 0;
            }, 2000);
        }
    });

    if(localStorage.dev == "true") $('body').addClass('dev');
    $("#reset-storage").click(() => storage.resetAll());
    $("#guid").text(localStorage.guid);
});




let option = {
    defineCheck: function(selector, storage, onChange){
        $selector = $(selector); //get selector
        if(localStorage[storage] == "true"){ //check true
            $selector.find("input").prop('checked', true); //check
            ifTrue(); //call ifTrue
        }

        else{
            option.find("input").prop('checked', false); //uncheck
            ifFalse(); //call ifFalse
        }
    },
    defineSelect: function(selector, storage, onChange){
        let $selector = $(selector);
        let val = localStorage[storage];
        $selector.val(val);

        onChange(val);
        $selector.change(() => {
            let val = $selector.val();
            localStorage[storage] = val;
            onChange(val);
        });
    }
}
