var optionsWrapper = document.createElement('div'),
    title = document.createElement('h3');
optionsWrapper.className = 'accordion-item';
showSelect.appendChild(title);
showSelect.appendChild(optionsWrapper);

for (var i = 0; i < select.options.length; i++) {
    if (select.options[i].selected === true) {
        title.textContent = select.options[i].innerText;
    }
    var selectOption = document.createElement('span');
    selectOption.textContent = select.options[i].innerText;
    selectOption.setAttribute('data-option', select.options[i].innerText);
    selectOption.setAttribute('data-index', i);
    selectOption.className = 'my-option';
    optionsWrapper.appendChild(selectOption);

    selectOption.onclick = function () {
        var option = this.dataset.option,
            index = this.dataset.index;
        title.textContent = option;
        select.selectedIndex = index;
    }
}

var accordion = myAccordion.createAccordion({
    elem: elements,
    item: '.accordion',
    selector: '.accordion-item'
});

var inputRangeStyle = myInputRange.createInputRange({
    realInput: inputRange,
    rangeBox: rangeBox,
    showingValuePlace: showValue,
});