/*
 * Kyoo - A portable and vast media library solution.
 * Copyright (c) Kyoo.
 *
 * See AUTHORS.md and LICENSE file in the project root for full license information.
 *
 * Kyoo is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Kyoo is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Kyoo. If not, see <https://www.gnu.org/licenses/>.
 */

import type { ReactElement } from "react";
import { type ImageStyle, View, type ViewStyle } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { useYoshiki } from "yoshiki/native";
import { Skeleton } from "../skeleton";
import type { ImageLayout, Props } from "./base-image";

export const Image = ({
	src,
	quality,
	alt,
	forcedLoading = false,
	layout,
	...props
}: Props & { style?: ImageStyle } & { layout: ImageLayout }) => {
	const { css } = useYoshiki();

	const border = { borderRadius: 6, overflow: "hidden" } satisfies ViewStyle;

	if (forcedLoading) return <Skeleton variant="custom" {...css([layout, border], props)} />;
	if (!src) return <View {...css([{ bg: (theme) => theme.overlay0 }, layout, border], props)} />;
	return (
		<ExpoImage
			alt={alt}
			contentFit="cover"
			placeholderContentFit="cover"
			placeholder={{ blurhash: src.blurhash }}
			source={src[quality ?? "high"]}
			recyclingKey={src.high}
			{...(css([layout, border]) as any)}
		/>
	);
};

Image.Loader = ({ layout, ...props }: { layout: ImageLayout; children?: ReactElement }) => {
	const { css } = useYoshiki();
	const border = { borderRadius: 6, overflow: "hidden" } satisfies ViewStyle;

	return <Skeleton variant="custom" show {...css([layout, border], props)} />;
};
