import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

const PopoverContainer = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <IconButton size="2" variant="ghost" color="indigo">
        <DotsHorizontalIcon height="20" width="20" />
      </IconButton>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
      >
        <div className="flex flex-col gap-2.5">
          <p className="text-[#000] text-[15px] leading-[19px] font-medium mb-2.5">Dimensions</p>
        </div>
        <Popover.Close
          className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
          aria-label="Close"
        >
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default PopoverContainer;
