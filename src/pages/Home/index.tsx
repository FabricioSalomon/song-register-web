import { useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import { Col, Row } from "antd";
import dayjs from "dayjs";

import {
  SongCard,
  NoSongsFound,
  LoadingSkeleton,
  NoSongsRegistered,
} from "./components";
import { Filter } from "./Filter";
import { Text } from "@/components/Text";
import { Title } from "@/components/Title";
import { FilterRequest, FormFields } from "./types";
import { ListAllSongsResponse, useListAllSongs } from "@/hooks";

export function Home() {
  let [searchParams] = useSearchParams();
  const queryParams = convertURLParamToObject(searchParams);

  const [filter, setFilter] = useState<FilterRequest | undefined>(queryParams);

  const {
    error,
    isFetching,
    data: songs,
    isError: errorGettingSongs,
  } = useListAllSongs(filter);

  if (errorGettingSongs) {
    return (
      <Row>
        <Text>{error.message ?? "Error getting songs"}</Text>
      </Row>
    );
  }

  function convertURLParamToObject(searchParams: URLSearchParams): FormFields {
    const params = Object.fromEntries(searchParams.entries());
    if (Object.keys(params)?.length > 0) {
      const { released_at_start, released_at_end } = params;

      const released_at =
        released_at_start && released_at_end
          ? [
              dayjs(new Date(released_at_start)),
              dayjs(new Date(released_at_end)),
            ]
          : undefined;

      const initialValues: FormFields = {
        ...params,
        released_at,
      };
      return initialValues;
    }

    return {};
  }

  function handleFilterClick(filterData?: FilterRequest) {
    setFilter(filterData);
  }

  function renderSongsList(queryParams: FilterRequest): React.ReactNode {
    if (isFetching) {
      return <LoadingSkeleton />;
    }
    if (hasSongs(songs)) {
      return (
        <Col xs={24}>
          <Row gutter={[8, 8]}>
            {songs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </Row>
        </Col>
      );
    }

    if (hasNoQueryParams(queryParams)) {
      return (
        <Col xs={24}>
          <NoSongsRegistered />
        </Col>
      );
    }

    return (
      <Col xs={24}>
        <NoSongsFound />
      </Col>
    );
  }

  function hasNoQueryParams(queryParams: FilterRequest): boolean {
    return (
      !queryParams?.name &&
      !queryParams?.keyword &&
      !queryParams?.author_id &&
      !queryParams?.released_at_end &&
      !queryParams?.released_at_start
    );
  }

  function hasSongs(
    songs: ListAllSongsResponse[] | undefined
  ): songs is ListAllSongsResponse[] {
    return !!songs && songs.length > 0;
  }

  let title = "Songs";

  if (hasSongs(songs)) {
    title += ` (Total: ${songs.length})`;
  }

  return (
    <Row style={{ padding: "0 1rem" }} gutter={[16, 16]}>
      <Title level={3} style={{ margin: 0 }}>
        {title}
      </Title>
      {(hasSongs(songs) || !hasNoQueryParams(queryParams)) && (
        <Col xs={24}>
          <Row>
            <Col xs={24}>
              <Filter
                queryParams={queryParams}
                onFilterClick={handleFilterClick}
              />
            </Col>
          </Row>
        </Col>
      )}
      {renderSongsList(queryParams)}
    </Row>
  );
}
