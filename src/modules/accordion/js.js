var link = '<link rel="stylesheet" type="text/css" href="modules/accordion/style.css">',
    head = document.getElementsByTagName('head');
head[0].innerHTML += link;
(function() {
    function Module () {
        this.name = 'My Accordion Module';
        this.version = '1.0.0';

        this.createAccordion = function(options) {
            if (!options.elem) {
                return null;
            }
            return new Accordion(options);
        }
    }

    function Accordion(options) {
        this.elem = options.elem;
        this.items = [];

        var htmlItems = this.elem.querySelectorAll(options.item)
        for (var i = 0; i < htmlItems.length; i++) {
            this.items.push(new AccordionItem(htmlItems[i], options.selector));
        }
    }

    function AccordionItem(item, selector) {
        this.elem = item;
        this.selector = this.elem.querySelector(selector);
        this.selector.classList.add('module-ac-toggle');

        this.elem.onclick = function () {
            if(this.selector.style.maxHeight) {
                this.selector.style.maxHeight = '';
            } else {
                this.selector.style.maxHeight = this.selector.scrollHeight + 'px';
            }
        }.bind(this);
    }
    window.myAccordion = new Module();
})();
