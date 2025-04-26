<template>
    <div>
        <figcaption class="text-md font-bold px-4 text-slate-400 text-right" >
            <!-- <slot /> -->
            <ContentSlot :use="$slots.default" unwrap="p" />
        </figcaption>
    </div>
</template>