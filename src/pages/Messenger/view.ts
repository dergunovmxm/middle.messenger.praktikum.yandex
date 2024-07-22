export const view = `
	<nav class='navigation-panel'></nav>
	<div class='messenger-title'></div>
	<div class='messenger-container'>
		<div class='messenger'>
			<div class='messenger-chat'>
				<div class='messenger-chat-title'></div>
				
				<div class='messenger-chat-detail'></div>
				<form class='messenger-input' onsubmit="return false;"></form>
			</div>
			<div class='messenger-chat-list'>
				<div class='messenger-chat-list-title'></div>
				<form class='messenger-add-user' onsubmit="return false;"></form>
				<div class='messenger-chat-list-items'></div>
			</div>
			
		</div>

	<div class='messenger-dialogs'>
		<div class='dialog-title'></div>
			<div class='dialog-search'></div>
			<form class='dialog-create' onsubmit="return false;"></form>
			<div class='dialogs-container'></div>
		</div>
	</div>
`;
