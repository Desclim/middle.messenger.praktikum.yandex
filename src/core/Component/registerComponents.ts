import {registerComponent} from "./registerComponent";
import {Button} from "../../components/button/button";
import {Input} from "../../components/input/input";
import {Link} from "../../components/link/link";
import {Search} from "../../components/search/search";
import {ChatItem} from "../../components/chat-item/chat-item";
import {PostMessage} from "../../components/post-message/post-message";
import {MessengerContent} from "../../blocks/messenger-content/messenger-content";
import {ProfileBackButton} from "../../components/profile-back-button/profile-back-button";
import {ProfileAvatar} from "../../components/profile-avatar/profile-avatar";
import {ContextMenu} from "../../components/context-menu/context-menu";
import {ActionModal} from "../../components/action-modal/action-modal";
import {Message} from "../../components/message/message";

export function registryComponents(): void {
  registerComponent(Button);
  registerComponent(Input);
  registerComponent(Link);
  registerComponent(Search);
  registerComponent(PostMessage);
  registerComponent(ChatItem);
  registerComponent(MessengerContent);
  registerComponent(ProfileBackButton);
  registerComponent(ProfileAvatar);
  registerComponent(ContextMenu);
  registerComponent(ActionModal);
  registerComponent(Message);
}

