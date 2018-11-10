var sequenceCore = {
	field : '<div class="ui-panel noHeader flex field-string"><div class="content"><span class="ui-label label-field">Seek</span><div class="ui-select-field noSelect field-path-components-model-type" style="flex-grow: 1;"><input type="range"></div></div>'
};

var sequencePanel   = sequenceCore.field;

var sequenceElement = document.createElement('div');
	sequenceElement.className = 'ui-panel component entity sequence';
	sequenceElement.innerHTML = '<header class="ui-header"><span class="title">Sequence</span></header><div class="content">' + sequencePanel + '</div>';

$('.ui-panel.component.noHeader').parentElement.append(sequenceElement);