"use strict";

// EDIT ME
const API_URL = "http://127.0.0.1:5000/v1/completions";
const DEFAULT_PRESET = {
	temperature: 1,
	repetition_penalty: 1.01
};
const DEFAULT_INSTRUCT_FORMAT = "none"; // Values: see INSTRUCT_FORMATS
const INDICATOR_TYPE = "glow"; // Values: notice, blinker, glow; see CSS
const UI_THEME = "dark-mode"; // Values: dark-mode, light-mode
const DISABLED_KEYS = new Set(["F5", "F7"]);



const GEN_PARAMS = [
	{
		name: "temperature",
		min: 0, max: 3, def: 1
	},
	{
		name: "top_a",
		min: 0, max: 1, def: 0
	},
	{
		name: "min_p",
		min: 0, max: 1, def: 0
	},
	{
		name: "smoothing_factor",
		min: 0, max: 2, def: 0
	},
	{
		name: "repetition_penalty",
		min: 1, max: 2, def: 1
	},
	{
		name: "penalty_range",
		min: 0, max: 8192, def: 2048, step: 256
	},
	{
		name: "max_tokens",
		min: 32, max: 2048, def: 384, step: 32
	},
	{ name: "add_bos_token", def: true }
];

const INSTRUCT_FORMATS = {
	none: "",
	alpaca: "\n\n### Instruction:\n\n\n### Response:\n",
	vicuna: "\n\nUSER: \nASSISTANT:",
	llama3: "<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
	cmdr: "\n\n<|END_OF_TURN_TOKEN|><|START_OF_TURN_TOKEN|><|USER_TOKEN|>\n\n<|END_OF_TURN_TOKEN|><|START_OF_TURN_TOKEN|><|CHATBOT_TOKEN|>",
	chatml: "<|im_end|>\n<|im_start|>user\n<|im_end|>\n<|im_start|>assistant\n",
	gemma: "<end_of_turn>\n<start_of_turn>user\n<end_of_turn>\n<start_of_turn>model\n",
	mistral: "\n[INST]\n\n[/INST]\n",
	deepseek: "<｜end▁of▁sentence｜>\n<｜User｜>\n<｜Assistant｜>",
	glm: "<|user|>\n<|assistant|>\n"
};
