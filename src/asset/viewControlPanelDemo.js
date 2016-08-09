(function(exports) {
  // some global variables to keep track of state
  var isPlaying = false;
  var playInterval;
  var playCtr = 0;

  exports.isPlaying = function() {
    return isPlaying;
  };

  exports.playCtr = function() {
    return playCtr;
  };

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
    // $('.cochleagramHuman').hover(handleCochleagramHover);
    $('#toggleHumanCochleagramsButton').click(toggleHumanCochleagrams);
    $('#toggleFerretCochleagramsButton').click(toggleFerretCochleagrams);
    $('#toggleSpectraButton').click(toggleSpectra);
    $('#toggleSignalsButton').click(toggleSignals);
    $('#playAllButton').click(playAll);
    $('#stopAllButton').click(stopAll);
  };

  exports.renderAndPromise = function(stimData) {
    // return a promise object that gets resolved when the element is done rendering
    var dfd = jQuery.Deferred();
    exports.render(stimData);
    $('#cochleagram-div').on('pageDone', function(){dfd.resolve('consent page done');});
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
        $('#dialogImg').prop('src', stimList[playCtr].fn_cochleagram_ferret);
        $('#'+stimList[playCtr].id).click();
      }, 500);
    }
  }

  function stopAll() {
    clearInterval(playInterval);
    $('#'+stimList[playCtr].id).css('border', '2px solid black');
    $('#playAllButton').html('Play All');
    playCtr = 0;
    isPlaying = false;
  }
})(this.VIEW_CONTROL_PANEL_DEMO = {});
