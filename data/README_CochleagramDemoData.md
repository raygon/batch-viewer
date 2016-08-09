# Explanation of Demo Stimuli JSON File

The JSON file specifies all of the data and resources required for a given input/stimulus/component. JSON is structured like an associative array (like a struct in MATLAB or a dictionary in Python), so it uses attribute-value pairs to store data. Values can be lists or associative arrays, which allows data to be nested and grouped. 

The basic layout of the Batch Viewer JSON file is:
allJSONData = {
  "stimList": [
    {"Input_1"},
    {"Input_2"},
    {"Input_3"},
    ...
    {"Input_N"},
  ]
}

Each of the inputs, i.e. {"Input_1"} through {"Input_N"}, contains the data and assets required to represent and visualize the input. This data can take the form of numbers, text strings, booleans, lists (for small arrays), but also, file paths and Uniform Resource Identifiers (URIs) for bigger files (images, plots, sounds, videos, etc.). The array below describes what each field represents for the demo JSON file provided in this folder. 

{"Input_N"} = {
  "id": "generic name or description that can be used to group all resources related to this specific input/stimulus.",
  "fn_cochleagram_human": "URI of the image file containing the cochleagram generated using a model of human cochlear response.",
  "fn_cochleagram_ferret": "URI of the image file containing the cochleagram generated from this signal using a model of ferret cochlear response.",
  "fn_pwelch": "URI of the image file that contains the plot of this input"s frequency spectrum.",
  "fn_signal": "URI of the image file that plots this input"s time-series signal.",
  "fn_sound": "URI of the audio file for playback of this input sound.",
  "f0": "Represents the fundamental frequency used to generate the synthesized tone for this input. Can be used for regression tasks.",
  "label": "Represents the frequency bin this input belongs to, as determined by fundamental frequency. Can be used for classification tasks.",
  "snr": "SNR of the final signal.",
  "ct_filts": "Butterworth filter cutoffs used to shape the synthesized tone. In this case, there was one lowpass filter, followed by two bandpass filters.",
  "noise_filts": "Butterworth filter cutoffs used to shape the noise that was added to the synthesized tone. In this case, there was only one bandpass filter."
}
