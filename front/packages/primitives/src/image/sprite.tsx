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

import { Image as ExpoImage } from "expo-image";

export const Sprite = ({
	src,
	alt,
	style,
	x,
	y,
	...props
}: {
	src: string;
	alt: string;
	width: number;
	height: number;
	x: number;
	y: number;
	rows: number;
	columns: number;
	style?: object;
}) => {
	return (
		<ExpoImage
			source={src}
			alt={alt}
			contentFit="none"
			contentPosition={{left: -x, top: -y}}
			style={{
				flexGrow: 0,
				flexShrink: 0,
				...style
			}}
			{...props}
		/>
	);
};
