"use client";

interface PostCaptionProps {
    username: string;
    caption: string;
    hashtags: {
        hashtag: {
            id: number;
            name: string;
        };
    }[]
}

export default function PostCaption({
    username,
    caption,
    hashtags
}: PostCaptionProps) {
    
    const hashtagText = hashtags
    .filter((item) => item?.hashtag?.name)
    .map((item) => `#${item.hashtag.name}`)
    .join(" ");
    const text = [caption, hashtagText]
        .filter(Boolean)
        .join(" ")
    const words = text.split(" ")
    return (
        <div className="px-4 pb-3">
            <p className="text-sm leading-7 text-foreground">
                <span className="mr-2 font-semibold">{username}</span>

               {words.map((word, index) => {
                    if (word.startsWith("#")) {
                        return (
                            <span
                                key={index}
                                className="mr-1 cursor-pointer text-primary hover:underline"
                            >
                                {word}
                            </span>
                        );
                    }

                    if (word.startsWith("@")) {
                        return (
                            <span
                                key={index}
                                className="mr-1 cursor-pointer text-primary hover:underline"
                            >
                                {word}
                            </span>
                        );
                    }

                    return (
                        <span
                            key={index}
                            className="mr-1 text-foreground"
                        >
                            {word}
                        </span>
                    );
                })}
            </p>
        </div>
    );
}