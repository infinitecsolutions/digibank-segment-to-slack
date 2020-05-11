const endpoint = 'https://hooks.slack.com/services/XYZ'

const forwardEvents = ['create_account', 'create_card', 'create_bank_account']

const texts = {
  create_account: 'Account was created.',
  create_card: 'Card was ordered.',
  create_bank_account: 'Bank account was opened.',
}
const title = {
  create_account: 'User',
  create_card: 'Card',
  create_bank_account: 'Bank Account',
}
const icons = {
  create_account: ':hatching_chick:',
  create_card: ':credit_card:',
  create_bank_account: ':bank:',
}

async function onTrack({event, context}) {
  if (!forwardEvents.includes(event)) return

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel: 'XYZ',
      text: texts[event],
      icon_emoji: icons[event],
      username: context.app.name + ' ' + title[event],
    }),
  })

  return response.text()
}
