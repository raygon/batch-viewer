// $('#container').append(
//       '<div id="'+stimData.id+'" class="stimulus_div">'+
//         '<a href="#" title="'+stimData.id+'" name="'+stimData.id+'">'+
//         '<img class="cochleagram cochleagram_human" src="' + stimData.fn_cochleagram_human + '">'+
//         '</a>'+
//         '<br/>'+
//         '<img class="cochleagram cochleagram_ferret" src="' + stimData.fn_cochleagram_ferret + '">'+
//         '<br/>'+
//         '<img class="pwelch" src="' + stimData.fn_pwelch + '">'+
//         '<img class="signal" src="' + stimData.fn_signal + '">'+
//         '<audio id="' + stimData.id + '_sound">'+
//           '<source src="' + stimData.fn_sound + '" type="audio/wav">'+
//           'Your browser does not support the audio element.'+
//         '</audio>'+
//         '<div id="'+stimData.id+'_metadata" class="metadata">'+
//           '<b>label</b>: ' + stimData.label+'<br/>'+
//           '<b>f0</b>: ' + cheap_round(stimData.f0, 2)+'<br/>'+
//           // '<b>harm_range</b>: ' + stimData.harm_range+'<br/>'+
//           '<b>snr</b>: ' + cheap_round(stimData.snr, 2)+'<br/>'+
//           '<b>slope</b>: ' + stimData.slope+'<br/>'+
//           ct_filts_str +
//         '</div>'+
//       '</div>');

(function(exports) {
  exports.render = function (stimData) {
    $('#container').append(
      $('<div/>', {
        id: stimData.id,
        class: "stimulus_div",
        html:
            '<a href="#" title="'+stimData.id+'" name="'+stimData.id+'">'+
            '<img class="cochleagram cochleagram_human" src="' + stimData.fn_cochleagram_human + '">'+
            '</a>'+
            '<br/>'+
            '<img class="cochleagram cochleagram_ferret" src="' + stimData.fn_cochleagram_ferret + '">'+
            '<br/>'+
            '<img class="pwelch" src="' + stimData.fn_pwelch + '">'+
            '<img class="signal" src="' + stimData.fn_signal + '">'+
            '<audio id="' + stimData.id + '_sound">'+
              '<source src="' + stimData.fn_sound + '" type="audio/wav">'+
              'Your browser does not support the audio element.'+
            '</audio>'+
            '<div id="'+stimData.id+'_metadata" class="metadata">'+
              '<b>label</b>: ' + stimData.label+'<br/>'+
              '<b>f0</b>: ' + cheap_round(stimData.f0, 2)+'<br/>'+
              // '<b>harm_range</b>: ' + stimData.harm_range+'<br/>'+
              '<b>snr</b>: ' + cheap_round(stimData.snr, 2)+'<br/>'+
              '<b>slope</b>: ' + stimData.slope+'<br/>'+
              // ct_filts_str +
            '</div>'
      })
    );
    // // wire up events
    // $('#consentCheckbox').on('change', exports.validateConsent);
    // $('#consentButton').click(function(){
    //   if (exports.validateConsent()) {
    //     $('#consent').hide();
    //     $('#instructions').show();
    //     // CONTROLLER.hasConsented = true;
    //     // Tell S3 that someone has started this task
    //     // CONTROLLER.ajaxSubmitResponse('START');
    //     $('#consentForm').trigger('pageDone');
    //   }
    // });
  };

  // exports.validateConsent = function() {
  //   var isValid = $('#consentCheckbox').is(':checked');
  //   if (isValid) {
  //     $('#consentError').css('visibility', 'hidden');
  //   }
  //   else {
  //     $('#consentError').css('visibility', 'visible');
  //   }
  //   return isValid;
  // };

  exports.renderAndPromise = function(stimData) {
    // return a promise object that gets resolved when the page is done
    var dfd = jQuery.Deferred();
    exports.render(stimData);
    $('#cochleagram-div').on('pageDone', function(){dfd.resolve('consent page done');});
    return dfd.promise();
  };
})(this.VIEW_COCHLEAGRAM_DEMO = {});
