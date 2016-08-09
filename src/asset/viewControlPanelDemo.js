/** This module provides functions to render and wire up a control panel
to interact with the entire set of cochleagrams. Note, this set up as a module
that will be "imported" into a controller file. Because of this, any variables
or functions required publicly (or outside of this module) must be exposed
using the exports.foo syntax. */
(function(exports) {
  // some variables to keep track of state
  var isPlaying = false;
  var playInterval;
  var playCtr = 0;

  /** Getter for isPlaying */
  exports.isPlaying = function() {
    return isPlaying;
  };

  /** Getter for playCtr */
  exports.playCtr = function() {
    return playCtr;
  };

  /** Renders the control panel in the container div, then wires up events. */
  exports.render = function () {
    $('#container').append(
      $('<div/>', {
        id: "controls",
        class: "stimulusDiv",
        html:
          '<button id="toggleHumanCochleagramsButton" type="button">Toggle Human Cochleagrams</button>'+
          '<button id="toggleFerretCochleagramsButton" type="button">Toggle Ferret Cochleagrams</button>'+
          '<button id="toggleSpectraButton" type="button">Toggle Spectra</button>'+
          '<button id="toggleSignalsButton" type="button">Toggle Signals</button>'+
          '<button id="playAllButton" type="button">Play All</button>'+
          '<button id="stopAllButton" type="button">Reset Playback</button>'
      })
    );
    // bind events (to global interactions)
    $('#toggleHumanCochleagramsButton').click(toggleHumanCochleagrams);
    $('#toggleFerretCochleagramsButton').click(toggleFerretCochleagrams);
    $('#toggleSpectraButton').click(toggleSpectra);
    $('#toggleSignalsButton').click(toggleSignals);
    $('#playAllButton').click(playAll);
    $('#stopAllButton').click(stopAll);
  };

  /** Wraps the rendering code in a jQuery deferred for easily attaching callbacks
  when the content has been rendered. */
  exports.renderAndPromise = function() {
    // return a promise object that gets resolved when the element is done rendering
    var dfd = jQuery.Deferred();
    exports.render(stimData);
    $('#controls').on('pageDone', function(){dfd.resolve('consent page done');});
    return dfd.promise();
  };

  function toggleSpectra() {
    $('.pwelch').toggle();
  }

  function toggleHumanCochleagrams() {
    $('.cochleagramHuman').toggle();
  }

  function toggleFerretCochleagrams() {
    $('.cochleagramFerret').toggle();
  }

  function toggleSignals() {
    $('.signal').toggle();
  }

  /** Steps through all of the stimuli in stimList, playing the audio file for
  each stimulus (by triggering a "click" event). */
  function playAll() {
    if (isPlaying) {
      $('#playAllButton').html('Resume');
      clearInterval(playInterval);
      isPlaying = false;
    }
    else {
      isPlaying = true;
      $('#playAllButton').html('Pause');
      $('#'+stimList[playCtr].id).css('border', '6px solid blue');
      $('#'+stimList[playCtr].id)[0].scrollIntoView();
      $('#'+stimList[playCtr].id).click();

      playInterval = setInterval(function () {
        $('#'+stimList[playCtr].id).css('border', '2px solid black');
        playCtr++;
        $('#'+stimList[playCtr].id).css('border', '6px solid blue');
        $('#'+stimList[playCtr].id)[0].scrollIntoView();
        $('#'+stimList[playCtr].id).click();
      }, 500);
    }
  }

  /** Stops the audio playback that was caused by playAll().  */
  function stopAll() {
    clearInterval(playInterval);
    $('#'+stimList[playCtr].id).css('border', '2px solid black');
    $('#playAllButton').html('Play All');
    playCtr = 0;
    isPlaying = false;
  }
})(this.VIEW_CONTROL_PANEL_DEMO = {});
