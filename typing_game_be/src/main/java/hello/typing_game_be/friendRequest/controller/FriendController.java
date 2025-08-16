package hello.typing_game_be.friendRequest.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hello.typing_game_be.common.security.CustomUserDetails;
import hello.typing_game_be.friendRequest.service.FriendService;
import hello.typing_game_be.user.dto.UserListResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    // 친구 목록 조회
    @GetMapping
    public ResponseEntity<List<UserListResponse>> getFriends(
        @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long userId = userDetails.getUserId();
        List<UserListResponse> friends = friendService.getFriends(userId);
        return ResponseEntity.ok(friends);
    }
}
