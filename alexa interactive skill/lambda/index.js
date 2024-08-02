/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const ACTIONS=[
            'paper',
            'rock',
            'scissor'
        ];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hi friend, welcome to interactive skills';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'hello';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const QuestionIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'QuestionIntent';
    },
    handle(handlerInput) {
        const questions = {question: 'What is the capital of Germany? Is it: a. Berlin ,or b. Edinburgh, or c. Cardiff?', answer: 'a'}
        const speechText = questions.question
        return handlerInput.responseBuilder
            .speak(speechText)
// add a reprompt if you want to keep the session open for the user to respond
            .reprompt('What is the capital of Germany? Is it: a.Berlin ,or b. Edinburgh, or c. Cardiff?')
            .getResponse();
    }
};


const ResponseIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'ResponseIntent');
    },
    handle(handlerInput) {
        const { requestEnvelope } = handlerInput;
        const { serviceClientFactory, responseBuilder } = handlerInput;
        
        var    answerSlot= Alexa.getSlotValue(requestEnvelope, 'response');
        
        let speechText = '';
         if(answerSlot === 'a'){
          speechText = '<audio src="soundbank://soundlibrary/sports/crowds/crowds_12"/><amazon:emotion name="excited" intensity="medium">Congrats, you play very well</amazon:emotion><break time="1s"/><amazon:domain name="conversational">. Berlin is the capital of Germany</amazon:domain>'
        } else {
          speechText = '<amazon:emotion name="disappointed" intensity="high">oops! sorry, you are wrong this time</amazon:emotion>.<break time="1s"/> <amazon:domain name="conversational">The correct answer is a. Berlin</amazon:domain>'
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
            
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput)  {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say start to begin questions then you can respond by a or b or c';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const GameIntentHandler = {
    canHandle(handlerInput)  {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GameIntent';
    },
    handle(handlerInput) {
        const userAction=handlerInput.requestEnvelope.request.intent.slots.action.value;
        let speakOutput='';
        let repromptOutput = 'what is your next move?';
        
        const alexaAction=ACTIONS[Math.floor(Math.random()*ACTIONS.length)];
        
        const combo = userAction+alexaAction;
        
        switch(combo)
        {
            case 'rockrock':
                speakOutput+="you played rock and I played rock,it is a tie!";
                break;
            case 'rockpaper':
                speakOutput+="you played rock and i played paper,i win!";
                break;
            case 'rockscissor':
                speakOutput+="you played rock and i played scissor,you win! congractulations";
                break;
        
            case 'paperrock':
                speakOutput+="you played rock and i played paper,you win!congractulations";
                break;
            case 'paperpaper':
                speakOutput+="you played paper and i played paper,it is a tie!";
                break;
            case 'paperscissor':
                speakOutput+="you played paper and i played scissor,i win!";
                break;
            case 'scissorrock':
                speakOutput+="you played scissor and i played rock,i win!";
                break;
            case 'scissorpaper':
                speakOutput+="you played scissor and i played paper,you win!congractulations!";
                break;
            case 'scissorscissor':
                speakOutput+="you played scissor and i played scissor,it is a tie!";
                break;
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput + repromptOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        QuestionIntentHandler,
        ResponseIntentHandler,
        HelpIntentHandler,
        GameIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();