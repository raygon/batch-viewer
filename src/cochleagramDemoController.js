var isPlaying = false;
var playInterval;
var playCtr = 0;

$(function(){
  // add stimulus data to page
  for (var i = 0; i < stimList.length; i++) {
    render_stimuli_element(stimList[i]);
    // VIEW_COCHLEAGRAM_DEMO.renderAndPromise(stimList[i]);
  }

  // $(document).tooltip({
  //   content: function () {
  //     // console.log(this);
  //     var title = $(this).prop('name');
  //     // console.log(title);
  //     test = $('#'+title+'_metadata');
  //     // console.log(test)
  //     return $('#'+title+'_metadata').html();
  //   }
  // });

  // bind events to batch components
  $('.stimulus_div').click(handle_cochleagram_click);

  // bind events (to global interactions)
  // $('.cochleagram_human').hover(handle_cochleagram_hover);
  $('#toggleHumanCochleagramsButton').click(toggle_human_cochleagrams);
  $('#toggleFerretCochleagramsButton').click(toggle_ferret_cochleagrams);
  $('#toggleSpectraButton').click(toggle_spectra);
  $('#toggleSignalsButton').click(toggle_signals);
  $('#playAllButton').click(play_all);
  $('#stopAllButton').click(stop_all);
});

function render_stimuli_element(stim_id) {
  // We have to fix the path if serving from mindhive
  if (stim_id.fn_cochleagram_human.includes('mindhive')) {
    stim_id.fn_cochleagram_human = stim_id.fn_cochleagram_human.replace('/mindhive/mcdermott/u/raygon/projects/deepFerret/', '../../../');
    stim_id.fn_cochleagram_ferret = stim_id.fn_cochleagram_ferret.replace('/mindhive/mcdermott/u/raygon/projects/deepFerret/', '../../../');
    stim_id.fn_sound = stim_id.fn_sound.replace('/mindhive/mcdermott/u/raygon/projects/deepFerret/', '../../../');
    stim_id.fn_pwelch = stim_id.fn_pwelch.replace('/mindhive/mcdermott/u/raygon/projects/deepFerret/', '../../../');
    stim_id.fn_signal = stim_id.fn_signal.replace('/mindhive/mcdermott/u/raygon/projects/deepFerret/', '../../../');
  }
  var ct_filts_str = '';
  for (var i = 0; i < stim_id.ct_filts.length; i++) {
    if (i === 0) {
      s_prefix = '<b>ct_filts: </b>';
    }
    else {
      s_prefix = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    }
    ct_filts_str += s_prefix + '[' + stim_id.ct_filts[i].map(function (x) {return cheap_round(x, 0);}) + ']<br/>';
  }
  $('#container').append(
        '<div id="'+stim_id.id+'" class="stimulus_div">'+
          '<a href="#" title="'+stim_id.id+'" name="'+stim_id.id+'">'+
          '<img class="cochleagram cochleagram_human" src="' + stim_id.fn_cochleagram_human + '">'+
          '</a>'+
          '<br/>'+
          '<img class="cochleagram cochleagram_ferret" src="' + stim_id.fn_cochleagram_ferret + '">'+
          '<br/>'+
          '<img class="pwelch" src="' + stim_id.fn_pwelch + '">'+
          '<img class="signal" src="' + stim_id.fn_signal + '">'+
          '<audio id="' + stim_id.id + '_sound">'+
            '<source src="' + stim_id.fn_sound + '" type="audio/wav">'+
            'Your browser does not support the audio element.'+
          '</audio>'+
          '<div id="'+stim_id.id+'_metadata" class="metadata">'+
            '<b>label</b>: ' + stim_id.label+'<br/>'+
            '<b>f0</b>: ' + cheap_round(stim_id.f0, 2)+'<br/>'+
            // '<b>harm_range</b>: ' + stim_id.harm_range+'<br/>'+
            '<b>snr</b>: ' + cheap_round(stim_id.snr, 2)+'<br/>'+
            '<b>slope</b>: ' + stim_id.slope+'<br/>'+
            ct_filts_str +
          '</div>'+
        '</div>');
}

function handle_cochleagram_click(evt) {
  evt.preventDefault(); // otherwise, it auto scrolls to the top of page
  // console.log(evt.currentTarget);
  var src = $(evt.currentTarget).prop("id");
  console.log(src);
  var filename = src.split('/').pop();
  // filename = filename.split('_cochleagram')[0] + '_sound';
  // console.log('playing' + filename);
  filename = src + '_sound';
  $('#'+filename)[0].play();
}

function handle_cochleagram_hover(evt) {
  console.log(evt.currentTarget.src);
  $('#dialogImg').prop('src', evt.currentTarget.src);
}

function toggle_spectra() {
  $('.pwelch').toggle();
}

function toggle_human_cochleagrams() {
  $('.cochleagram_human').toggle();
}

function toggle_ferret_cochleagrams() {
  $('.cochleagram_ferret').toggle();
}

function toggle_signals() {
  $('.signal').toggle();
}

function play_all() {
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

function stop_all() {
    clearInterval(playInterval);
    $('#'+stimList[playCtr].id).css('border', '2px solid black');
    $('#playAllButton').html('Play All');
    playCtr = 0;
    isPlaying = false;
}

function cheap_round(val, n_decimals) {
  n_decimals = n_decimals >= 0 ? n_decimals : 0;
  mul_factor = Math.pow(10, n_decimals);
  return Math.round(mul_factor * val) / mul_factor;
}
