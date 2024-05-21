# QuantumLearn
The academic organizer that helps you improve.
```json
{
	"info": {
		"_postman_id": "999d6229-668b-4223-b828-f752cdea6613",
		"name": "QuantumLearn",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "32399542"
	},
	"item": [
		{
			"name": "Notes",
			"item": []
		},
		{
			"name": "File",
			"item": [
				{
					"name": "FileUpload",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "file",
									"type": "file",
									"src": "postman-cloud:///1ef0d8a8-7d00-46a0-bc24-62145c490a50"
								}
							]
						},
						"url": {
							"raw": "http://localhost:9090/user/upload/1",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "9090",
							"path": [
								"user",
								"upload",
								"1"
							]
						}
					},
					"response": [
						{
							"name": "FileUploadimage",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "formdata",
									"formdata": [
										{
											"key": "file",
											"type": "file",
											"src": "postman-cloud:///1ef0d8a8-7d00-46a0-bc24-62145c490a50"
										}
									]
								},
								"url": {
									"raw": "http://localhost:9090/drive/upload",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "9090",
									"path": [
										"drive",
										"upload"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "3390"
								},
								{
									"key": "ETag",
									"value": "W/\"d3e-85e/tHY6XlHbHbDYR/bpl4tCqHs\""
								},
								{
									"key": "Date",
									"value": "Wed, 08 May 2024 22:31:11 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"config\": {\n        \"url\": \"https://www.googleapis.com/upload/drive/v3/files?fields=id&uploadType=multipart\",\n        \"method\": \"POST\",\n        \"apiVersion\": \"\",\n        \"userAgentDirectives\": [\n            {\n                \"product\": \"google-api-nodejs-client\",\n                \"version\": \"7.2.0\",\n                \"comment\": \"gzip\"\n            }\n        ],\n        \"data\": {\n            \"_readableState\": {\n                \"state\": 325654,\n                \"highWaterMark\": 16384,\n                \"buffer\": {\n                    \"head\": null,\n                    \"tail\": null,\n                    \"length\": 0\n                },\n                \"length\": 0,\n                \"pipes\": [],\n                \"flowing\": false,\n                \"errored\": null,\n                \"defaultEncoding\": \"utf8\",\n                \"awaitDrainWriters\": null,\n                \"decoder\": null,\n                \"encoding\": null\n            },\n            \"_events\": {},\n            \"_eventsCount\": 2,\n            \"_writableState\": {\n                \"state\": 948198,\n                \"highWaterMark\": 16384,\n                \"defaultEncoding\": \"utf8\",\n                \"length\": 0,\n                \"corked\": 0,\n                \"writecb\": null,\n                \"writelen\": 0,\n                \"afterWriteTickInfo\": null,\n                \"buffered\": [],\n                \"bufferedIndex\": 0,\n                \"pendingcb\": 0,\n                \"errored\": null\n            },\n            \"allowHalfOpen\": true\n        },\n        \"headers\": {\n            \"x-goog-api-client\": \"gdcl/7.2.0 gl-node/20.8.1\",\n            \"content-type\": \"multipart/related; boundary=8220da41-0294-4545-83a5-97b513f0d9f1\",\n            \"Accept-Encoding\": \"gzip\",\n            \"User-Agent\": \"google-api-nodejs-client/7.2.0 (gzip)\",\n            \"Authorization\": \"Bearer ya29.c.c0AY_VpZiVEiKiH7pRPcaYFwAPYHau-Bx_Had1L7v639q5Acrig0UPjuqAAFHz10DUQdwWmLIDhyd0bJ2LZUly0u9YGgMjTe7UBuLOLssdj0COidYnjpidXnje8KKllOhWFYym4QJGTacbr0MuzwNRWgQ0WR1EXNDY-OnTwcHp9lvsTNSgSwRAsF1rDtQqRPW24HVF9yXH2H7n2XuR7iW8D8kbWiqAnZjFCB2TUdtrWNFREYmUTuoxx_2mdtVYiGQ7tt-YFlof_NC8I79QOEGx5DI2zNOeORn5M9iCExgVYaqv3RyAeazheg5OhHjzuqptZyaGhjKOi7BFOlhVTiaJjMXiP8c_TDhBT4-sT4mvNR629Vn37aTUA8fXG385ClvZZYQmj4S0u9vOwJrR9OM_4mSfgnOc5BmkdYMq7iRzdwmlo1uM41xt9V-wd78SlftIV3Rbp7h8cBmRvodhptUd2uthkwF7aeyI0gcjJj9lf6Xy-d7Mxa41ioqkyar8V52_sU3a75yVFRFg3q8y5_ZuxBlmy3dYwv_Qn077q9Iwui6c0mpF_3a6-MezOiWao5lxiW8rmpjB14SSeqgzrxVjOozVMqhw3u2i0w4rBrpc8ahzjBlYvY4BS01xn22o7v4gQswc1jrJtIc3Sihha0ql3ta00p2oc9WXu-ldX_O6OxiM0nIS9gfdZ2ilS4Q_WIW4kJmzVXmigegQc4lvYS2RMbWmegJvj3UjYp_83flseeicJ2_iQszxa3V_7uJ-5Vds8IlkssY54d59mkxjBgsQemvu1q17epgBvWqy9obsnm_OMdt3Fvlc0pZcJungUvqQoJRulcxu_ItZp-R4SW3e1-pfponrgj-Bp1qoWrRwWv2o_202auYRy3hF3vrX19lZIjmc9orYtn-I_XzbwgBezXlpjh3h4n05MxpRzMkQ4-X9c4MtsSek1WySvrnYjZtcadiXv9RYfuF6J-BzOSBwROboBzzBRIecO8UQff7aFkv-gy1MlYQl3JV\"\n        },\n        \"params\": {\n            \"fields\": \"id\",\n            \"uploadType\": \"multipart\"\n        },\n        \"retry\": true,\n        \"body\": {\n            \"_readableState\": {\n                \"state\": 325654,\n                \"highWaterMark\": 16384,\n                \"buffer\": {\n                    \"head\": null,\n                    \"tail\": null,\n                    \"length\": 0\n                },\n                \"length\": 0,\n                \"pipes\": [],\n                \"flowing\": false,\n                \"errored\": null,\n                \"defaultEncoding\": \"utf8\",\n                \"awaitDrainWriters\": null,\n                \"decoder\": null,\n                \"encoding\": null\n            },\n            \"_events\": {},\n            \"_eventsCount\": 2,\n            \"_writableState\": {\n                \"state\": 948198,\n                \"highWaterMark\": 16384,\n                \"defaultEncoding\": \"utf8\",\n                \"length\": 0,\n                \"corked\": 0,\n                \"writecb\": null,\n                \"writelen\": 0,\n                \"afterWriteTickInfo\": null,\n                \"buffered\": [],\n                \"bufferedIndex\": 0,\n                \"pendingcb\": 0,\n                \"errored\": null\n            },\n            \"allowHalfOpen\": true\n        },\n        \"responseType\": \"unknown\"\n    },\n    \"data\": {\n        \"id\": \"1CW4b6t2yHC5dBvep7WOVrfW6MADDlDc_\"\n    },\n    \"headers\": {\n        \"access-control-allow-credentials\": \"true\",\n        \"alt-svc\": \"h3=\\\":443\\\"; ma=2592000,h3-29=\\\":443\\\"; ma=2592000\",\n        \"cache-control\": \"no-cache, no-store, max-age=0, must-revalidate\",\n        \"content-length\": \"48\",\n        \"content-type\": \"application/json; charset=UTF-8\",\n        \"date\": \"Wed, 08 May 2024 22:31:11 GMT\",\n        \"expires\": \"Mon, 01 Jan 1990 00:00:00 GMT\",\n        \"pragma\": \"no-cache\",\n        \"server\": \"ESF\",\n        \"vary\": \"Origin, X-Origin\",\n        \"x-content-type-options\": \"nosniff\",\n        \"x-frame-options\": \"SAMEORIGIN\",\n        \"x-guploader-uploadid\": \"ABPtcPohrNPoQpMXMkywK9gWSmRQVTXOldgcXU-ZWLspZKIF48zMpZckB-ouvR1HPSeu05XyE6g\",\n        \"x-xss-protection\": \"0\"\n    },\n    \"status\": 200,\n    \"statusText\": \"OK\",\n    \"request\": {\n        \"responseURL\": \"https://www.googleapis.com/upload/drive/v3/files?fields=id&uploadType=multipart\"\n    }\n}"
						},
						{
							"name": "FileUpload",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "formdata",
									"formdata": [
										{
											"key": "file",
											"type": "file",
											"src": "postman-cloud:///1ef0d8a8-7d00-46a0-bc24-62145c490a50"
										}
									]
								},
								"url": {
									"raw": "http://localhost:9090/user/upload/1",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "9090",
									"path": [
										"user",
										"upload",
										"1"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "312"
								},
								{
									"key": "ETag",
									"value": "W/\"138-utkAJSj/8T60armgj66v9NHtP6U\""
								},
								{
									"key": "Date",
									"value": "Wed, 08 May 2024 23:53:50 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"id\": 1,\n    \"email\": \"Enos_Maggio38@yahoo.com\",\n    \"name\": \"Roma64\",\n    \"second_name\": \"Raynor\",\n    \"password\": \"$2b$10$2wXht6TLNZtkF5sbnke7K.akFzZt2stH0d8v2cqy.ayh/kqciYfp2\",\n    \"url_photo\": \"1ivROjQIDlA_YXQ27YdGGGYK0pMTrBiN6\",\n    \"extension\": null,\n    \"active\": true,\n    \"createdAt\": \"2024-03-21T16:05:17.000Z\",\n    \"updatedAt\": \"2024-05-08T23:53:49.984Z\"\n}"
						}
					]
				},
				{
					"name": "getFile",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:9090/user/file/1CW4b6t2yHC5dBvep7WOVrfW6MADDlDc_",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "9090",
							"path": [
								"user",
								"file",
								"1CW4b6t2yHC5dBvep7WOVrfW6MADDlDc_"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "IA",
			"item": [
				{
					"name": "GenerateText",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": [
						{
							"name": "New Request",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\"text\":\"Describe the process of photosynthesis.\"}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:9090/openai/generate-text",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "9090",
									"path": [
										"openai",
										"generate-text"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "372"
								},
								{
									"key": "ETag",
									"value": "W/\"174-We705AOhvIXalF5XcgKzlTnAi0w\""
								},
								{
									"key": "Date",
									"value": "Thu, 09 May 2024 17:46:36 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"generated_text\": {\n        \"id\": \"chatcmpl-9N28hT6xXWEtpPtMYmC97mfDGSh2O\",\n        \"object\": \"chat.completion\",\n        \"created\": 1715276795,\n        \"model\": \"gpt-3.5-turbo-0125\",\n        \"choices\": [\n            {\n                \"index\": 0,\n                \"message\": {\n                    \"role\": \"assistant\",\n                    \"content\": \"How can I assist you today?\"\n                },\n                \"logprobs\": null,\n                \"finish_reason\": \"stop\"\n            }\n        ],\n        \"usage\": {\n            \"prompt_tokens\": 13,\n            \"completion_tokens\": 7,\n            \"total_tokens\": 20\n        },\n        \"system_fingerprint\": null\n    }\n}"
						},
						{
							"name": "New Request",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\"text\":\"Describe the process of photosynthesis.\"}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:9090/openai/generate-text",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "9090",
									"path": [
										"openai",
										"generate-text"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "48"
								},
								{
									"key": "ETag",
									"value": "W/\"30-ndNVt+mtzMYnXzCB4PqudtxJwa8\""
								},
								{
									"key": "Date",
									"value": "Thu, 09 May 2024 17:51:55 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"generated_text\": \"How can I assist you today?\"\n}"
						}
					]
				},
				{
					"name": "EvaluateImage",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": [
						{
							"name": "New Request",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "formdata",
									"formdata": [
										{
											"key": "file",
											"type": "file",
											"src": "postman-cloud:///1ef0d8a8-7d00-46a0-bc24-62145c490a50"
										}
									]
								},
								"url": {
									"raw": "http://localhost:9090/openai/evaluate-image",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "9090",
									"path": [
										"openai",
										"evaluate-image"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "141"
								},
								{
									"key": "ETag",
									"value": "W/\"8d-1tZUhRxDDM63XPt/qLJbewVKqMs\""
								},
								{
									"key": "Date",
									"value": "Thu, 09 May 2024 19:19:17 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"response\": \"Without an image provided, I'm unable to give a detailed description. Could you please provide the image you'd like described?\"\n}"
						},
						{
							"name": "New Request",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "formdata",
									"formdata": [
										{
											"key": "file",
											"type": "file",
											"src": "postman-cloud:///1ef0d8a8-7d00-46a0-bc24-62145c490a50"
										}
									]
								},
								"url": {
									"raw": "http://localhost:9090/openai/evaluate-image",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "9090",
									"path": [
										"openai",
										"evaluate-image"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "847"
								},
								{
									"key": "ETag",
									"value": "W/\"34f-cW+0hd8PWPSogp95X76e0O5WyoA\""
								},
								{
									"key": "Date",
									"value": "Thu, 09 May 2024 19:21:22 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"response\": \"Como asistente AI, no puedo ver imágenes o proporcionar descripciones visuales. Sin embargo, puedo explicar cómo sería una descripción detallada de una imagen elegida al azar. \\n\\nPor ejemplo: \\\"En la imagen hay un atardecer en una playa desierta. Los últimos rayos del sol brillan en tonos naranjas y rosados, desvaneciéndose en la oscuridad del crepúsculo. El cielo, manchado con nubes etéreas, se refleja en las tranquilas aguas del mar. En primer plano, la arena dorada está salpicada de caracoles y piedras, arrastrados a la orilla por las olas. A la derecha, se puede ver una palmera solitaria inclinada hacia el mar, sus hojas siluetadas contra el cielo en fuga. Al fondo, distantes acantilados bordean el horizonte. La imagen evoca una sensación de calma y paz, resaltando la belleza silenciosa de la naturaleza.\\\"\"\n}"
						}
					]
				}
			]
		},
		{
			"name": "Auth",
			"item": [
				{
					"name": "Login",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"email\":\"admin@example.com\",\r\n    \"password\":\"Admin123#\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:9090/user/login",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "9090",
							"path": [
								"user",
								"login"
							]
						}
					},
					"response": [
						{
							"name": "New Request",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n    \"email\":\"admin@example.com\",\r\n    \"password\":\"Admin123#\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "http://localhost:9090/user/login",
									"protocol": "http",
									"host": [
										"localhost"
									],
									"port": "9090",
									"path": [
										"user",
										"login"
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "189"
								},
								{
									"key": "ETag",
									"value": "W/\"bd-L/FmL6enbDArvdr8wDuQK62U+ek\""
								},
								{
									"key": "Date",
									"value": "Fri, 10 May 2024 01:23:39 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "{\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExLCJyb2xlcyI6ImFkbWluIiwibm9tYnJlIjoiIiwiaWF0IjoxNzE1MzA0MjE5LCJleHAiOjE3MTUzMTg2MTl9.6g4H1LbGVZ5qBggW1ziQ8GKvIE-N9riNHeki9RePQRM\"\n}"
						}
					]
				}
			]
		},
		{
			"name": "Questionnaries",
			"item": []
		}
	]
}
```
