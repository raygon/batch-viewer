/** This module provides functions to render and wire up individual stimuli/inputs/components;
for the demo, these are cochleagrams and associated sounds.
Note, this set up as a module that will be "imported" into a controller file.
Because of this, any variables or functions required publicly (or outside of
this module) must be exposed using the exports.foo syntax. */
(function(exports) {
  /**
  * Renders the control panel in the container div, then wires up events.
  * @param {JSON-type object} title - The associative array data required to
  populate the display being rendered.
  */
  exports.render = function (stimData) {
    var ctFiltsStr = '';
    for (var i = 0; i < stimData.ct_filts.length; i++) {
      if (i === 0) {
        sPrefix = '<b>ct_filts: </b>';
      }
      else {
        sPrefix = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
      }
      ctFiltsStr += sPrefix + '[' + stimData.ct_filts[i].map(function (x) {return truncateToNDecimals(x, 0);}) + ']<br/>';
    }
    $('#container').append(
      $('<div/>', {
        id: stimData.id,
        class: "stimulusDiv",
        html:
            '<a href="#" title="'+stimData.id+'" name="'+stimData.id+'">'+
            '<img class="cochleagram cochleagramHuman" src="' + stimData.fn_cochleagram_human + '">'+
            '</a>'+
            '<br/>'+
            '<img class="cochleagram cochleagramFerret" src="' + stimData.fn_cochleagram_ferret + '">'+
            '<br/>'+
            '<img class="pwelch" src="' + stimData.fn_pwelch + '">'+
            '<br/>'+
            '<img class="signal" src="' + stimData.fn_signal + '">'+
            '<audio id="' + stimData.id + 'Sound">'+
              '<source src="' + stimData.fn_sound + '" type="audio/wav">'+
              'Your browser does not support the audio element.'+
            '</audio>'+
            '<div id="'+stimData.id+'Metadata" class="metadata">'+
              '<b>label</b>: ' + stimData.label+'<br/>'+
              '<b>f0</b>: ' + truncateToNDecimals(stimData.f0, 2)+'<br/>'+
              '<b>snr</b>: ' + truncateToNDecimals(stimData.snr, 2)+'<br/>'+
              ctFiltsStr +
            '</div>'
      })
    );
    // wire up events
    $('#'+stimData.id).click(handleCochleagramClick);
  };

  /** Wraps the rendering code in a jQuery deferred for easily attaching callbacks
  when the content has been rendered. */
  exports.renderAndPromise = function(stimData) {
    // return a promise object that gets resolved when the element is done rendering
    var dfd = jQuery.Deferred();
    exports.render(stimData);
    $('#'+stimData.id).on('pageDone', function(){dfd.resolve('cochleagram demo page done rendering');});
    return dfd.promise();
  };

  /** Handle a click event by playing the sound associated with the stimulus that was clicked. */
  function handleCochleagramClick(evt) {
    evt.preventDefault(); // otherwise, it auto scrolls to the top of page
    var src = $(evt.currentTarget).prop("id");
    // console.log(src);
    var filename = src.split('/').pop();
    filename = src + 'Sound';
    $('#'+filename)[0].play();
  }
})(this.VIEW_COCHLEAGRAM_DEMO = {});
