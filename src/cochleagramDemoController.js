/** $(fx) is a jQuery function that runs the input function fx when the document is
done loading. This sets up the cochleagram demo page. */
$(function setupCochleagramDemo(){
  // create a container div to hold everything (useful for styling)
  $('body').html(
    '<div id="outer">'+
    '  <div id="container"></div>'+
    '</div>'
    );

  // add all stimuli/components to page
  for (var i = 0; i < stimList.length; i++) {
    VIEW_COCHLEAGRAM_DEMO.renderAndPromise(stimList[i]);
  }

  // add control panel to page
  VIEW_CONTROL_PANEL_DEMO.renderAndPromise();
});

/**
 * Truncates the given value to n decimal places, useful for displaying floats.
 * @param {number} val - The number to be truncated.
 * @param {int} author - The number of decimal places to retain.
 */
function truncateToNDecimals(val, nDecimals) {
  nDecimals = nDecimals >= 0 ? nDecimals : 0;
  mulFactor = Math.pow(10, nDecimals);
  return Math.round(mulFactor * val) / mulFactor;
}
