import {registerComponent} from "../../core/ComponentRegistry";
import {Button} from "../../components/button/button";
import {Input} from "../../components/input/input";
import {Link} from "../../components/link/link";
import {Search} from "../../components/search/search";
import {ChatItem} from "../../components/chat-item/chat-item";
import {PostMessage} from "../../components/post-message/post-message";
import {ChatContent} from "../../blocks/chat-content/chat-content";
import {ProfileBackButton} from "../../components/profile-back-button/profile-back-button";
import {ProfileAvatar} from "../../components/profile-avatar/profile-avatar";

export function registryComponents(): void {
  registerComponent(Button);
  registerComponent(Input);
  registerComponent(Link);
  registerComponent(Search);
  registerComponent(PostMessage);
  registerComponent(ChatItem);
  registerComponent(ChatContent);
  registerComponent(ProfileBackButton);
  registerComponent(ProfileAvatar);
}
