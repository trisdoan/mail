import { Chatter } from "@mail/chatter/web_portal/chatter";
import {FailedMessage} from "@mail_tracking/components/failed_message/failed_message.esm";
import {FailedMessagesPanel} from "@mail_tracking/components/failed_messages_panel/failed_messages_panel.esm";
import {patch} from "@web/core/utils/patch";

const {useState} = owl;
Object.assign(Chatter.components, {
    FailedMessage,
    FailedMessagesPanel,
});

/**
 * @type {import("@mail/chatter/web_portal/chatter").Chatter }
 * @typedef {Object} Props
 * @property {function} [close]
 */
patch(Chatter.prototype, {
    setup() {
        super.setup(...arguments);
        this.state = useState({
            ...this.state,
            showFailedMessageList: true,
            isSearchFailedOpen: false,
        });
    },
    get failed_messages() {
        return this.state.thread?.messages.filter((message) => {
            return message.is_failed_message;
        });
    },
    toggleFailedMessageList() {
        this.state.showFailedMessageList = !this.state.showFailedMessageList;
    },
    toggleSearchFailedOpen() {
        this.state.isSearchFailedOpen = !this.state.isSearchFailedOpen;
    },
    closeSearchFailed() {
        this.state.isSearchFailedOpen = false;
    },
    async reloadParentView() {
        console.log("testtt")
        await this.props.saveRecord?.();
        if (this.props.webRecord) {
            await this.props.webRecord.load();
        }
    },
});